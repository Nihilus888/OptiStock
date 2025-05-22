import requests
from django.core.cache import cache
from django.http import JsonResponse
import logging
import os

logger = logging.getLogger(__name__)
API_KEY = os.getenv('ALPHA_VANTAGE_API')  # Use environment variable

def balance_sheet(request, symbol):
    return fetch_financial_statement(request, symbol, 'BALANCE_SHEET', 'balance_sheet')

def income_sheet(request, symbol):
    return fetch_financial_statement(request, symbol, 'INCOME_STATEMENT', 'income_sheet')

def fetch_financial_statement(request, symbol, function_name, cache_prefix):
    if not API_KEY:
        logger.error("Missing Alpha Vantage API key")
        return JsonResponse({'error': 'Internal configuration error'}, status=500)

    if not symbol.isalnum():
        logger.error(f"Invalid symbol format for {symbol}")
        return JsonResponse({'error': 'Invalid symbol format'}, status=400)

    cache_key = f'{cache_prefix}:{symbol.upper()}'
    cached_data = cache.get(cache_key)

    if cached_data:
        return JsonResponse({'source': 'cache', 'data': cached_data})

    url = f'https://www.alphavantage.co/query?function={function_name}&symbol={symbol}&apikey={API_KEY}'
    try:
        response = requests.get(url)
        data = response.json()
    except (requests.RequestException, ValueError) as e:
        logger.exception(f"Error fetching data from Alpha Vantage for {symbol}")
        return JsonResponse({'error': str(e)}, status=500)

    if 'annualReports' in data:
        ## Set to 3 months to get new data every earnings season
        cache.set(cache_key, data['annualReports'], timeout=60 * 60 * 24 * 90)
        return JsonResponse({'source': 'api', 'data': data['annualReports']})
    elif 'Note' in data or 'Information' in data:
        logger.warning(f"Rate limit or info returned by Alpha Vantage for {symbol}: {data}")
        return JsonResponse({'error': data}, status=429)
    else:
        logger.exception(f"API error for {symbol} using {function_name}")
        return JsonResponse({'error': f'No data found for {function_name}'}, status=400)
