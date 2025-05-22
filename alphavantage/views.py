import requests
from django.core.cache import cache
from django.http import JsonResponse
import os

API_KEY = os.getenv('ALPHA_VANTAGE_API')  # Use environment variable

def balance_sheet(request, symbol):
    cache_key = f'balance_sheet:{symbol.upper()}'
    cached_data = cache.get(cache_key)

    if cached_data:
        return JsonResponse({'source': 'cache', 'data': cached_data})

    url = f'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol={symbol}&apikey={API_KEY}'
    try:
        response = requests.get(url)

        try:
            data = response.json()
        except ValueError:
            return JsonResponse({'error': 'Invalid JSON response'}, status=500)

        if 'annualReports' in data:
            cache.set(cache_key, data['annualReports'], timeout=60 * 60 * 24 * 90)
            return JsonResponse({'source': 'api', 'data': data['annualReports']})
        elif 'Note' in data or 'Information' in data:
            return JsonResponse({'error': data}, status=429)  # 429 Too Many Requests
        else:
            return JsonResponse({'error': 'No annualReports found'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
