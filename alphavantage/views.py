import requests
from django.core.cache import cache
from django.http import JsonResponse
import logging
import os

logger = logging.getLogger(__name__)
API_KEY = os.getenv('ALPHA_VANTAGE_API')

def balance_sheet(request, symbol):
    return fetch_financial_statement(symbol, 'BALANCE_SHEET', 'balance_sheet')

def income_sheet(request, symbol):
    return fetch_financial_statement(symbol, 'INCOME_STATEMENT', 'income_sheet')

def financial_news(request, symbol):
    return fetch_financial_news(symbol, 'financial_news')

def check_cache(symbol, cache_prefix):
    if not API_KEY:
        logger.error("Missing Alpha Vantage API key")
        return JsonResponse({'error': 'Internal configuration error'}, status=500)

    # Basic validation: allow alphanumeric + dot/dash (common in tickers)
    import re
    if not re.match(r'^[\w\.\-]+$', symbol):
        logger.error(f"Invalid symbol format for {symbol}")
        return JsonResponse({'error': 'Invalid symbol format'}, status=400)

    cache_key = f'{cache_prefix}:{symbol.upper()}'
    cached_data = cache.get(cache_key)

    if cached_data:
        return JsonResponse({'source': 'cache', 'data': cached_data})
    
    return None, cache_key

def get_response(symbol, url, cache_key, function_name, timeout):
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
    except (requests.RequestException, ValueError) as e:
        logger.exception(f"Error fetching data from Alpha Vantage for {symbol}")
        return JsonResponse({'error': str(e)}, status=500)

    if 'annualReports' in data:
        cache.set(cache_key, data['annualReports'], timeout=timeout)
        return JsonResponse({'source': 'api', 'data': data['annualReports']})
    elif 'Note' in data or 'Information' in data:
        logger.warning(f"Rate limit or info returned by Alpha Vantage for {symbol}: {data}")
        return JsonResponse({'error': data}, status=429)
    else:
        logger.error(f"API error for {symbol} using {function_name}: {data}")
        return JsonResponse({'error': f'No data found for {function_name}'}, status=400)

def fetch_financial_statement(symbol, function_name, cache_prefix):
    cached_response_or_none = check_cache(symbol, cache_prefix)
    if isinstance(cached_response_or_none, JsonResponse):
        return cached_response_or_none

    _, cache_key = cached_response_or_none
    url = f'https://www.alphavantage.co/query?function={function_name}&symbol={symbol}&apikey={API_KEY}'
    timeout = 60 * 60 * 24 * 90  # 90 days
    return get_response(symbol, url, cache_key, function_name, timeout)

def fetch_financial_news(symbol, cache_prefix):
    cached_response_or_none = check_cache(symbol, cache_prefix)
    if isinstance(cached_response_or_none, JsonResponse):
        return cached_response_or_none

    _, cache_key = cached_response_or_none
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={symbol}&apikey={API_KEY}'
    timeout = 60 * 60 * 24  # 1 day
    return get_response(symbol, url, cache_key, 'NEWS_SENTIMENT', timeout)
