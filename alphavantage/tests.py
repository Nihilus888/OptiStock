from django.test import TestCase, RequestFactory
from unittest.mock import patch, MagicMock
from django.http import JsonResponse

from alpha_vantage import views

class FinancialDataViewTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.symbol = "AAPL"

    @patch('alpha_vantage.views.cache.get')
    @patch('alpha_vantage.views.requests.get')
    @patch('alpha_vantage.views.cache.set')
    def test_balance_sheet_success_from_api(self, mock_cache_set, mock_requests_get, mock_cache_get):
        mock_cache_get.return_value = None  # No cache
        mock_response = MagicMock()
        mock_response.json.return_value = {
            'annualReports': [{'fiscalDateEnding': '2023-12-31'}]
        }
        mock_response.raise_for_status = lambda: None
        mock_requests_get.return_value = mock_response

        request = self.factory.get('/api/balance-sheet/')
        response = views.balance_sheet(request, self.symbol)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['source'], 'api')
        self.assertIn('fiscalDateEnding', response.json()['data'][0])

    @patch('alpha_vantage.views.cache.get')
    def test_invalid_symbol(self, mock_cache_get):
        request = self.factory.get('/api/balance-sheet/')
        response = views.balance_sheet(request, "INVALID$$$")
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())

    @patch('alpha_vantage.views.cache.get')
    def test_balance_sheet_from_cache(self, mock_cache_get):
        mock_cache_get.return_value = [{'fiscalDateEnding': '2022-12-31'}]
        request = self.factory.get('/api/balance-sheet/')
        response = views.balance_sheet(request, self.symbol)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['source'], 'cache')
        self.assertIn('fiscalDateEnding', response.json()['data'][0])

    @patch('alpha_vantage.views.requests.get')
    @patch('alpha_vantage.views.cache.get')
    def test_api_rate_limit_error(self, mock_cache_get, mock_requests_get):
        mock_cache_get.return_value = None
        mock_response = MagicMock()
        mock_response.json.return_value = {'Note': 'API call frequency exceeded'}
        mock_response.raise_for_status = lambda: None
        mock_requests_get.return_value = mock_response

        request = self.factory.get('/api/price/')
        response = views.price(request, self.symbol)

        self.assertEqual(response.status_code, 429)
        self.assertIn('error', response.json())

    @patch('alpha_vantage.views.cache.get')
    @patch('alpha_vantage.views.requests.get')
    def test_missing_data_key(self, mock_requests_get, mock_cache_get):
        mock_cache_get.return_value = None
        mock_response = MagicMock()
        mock_response.json.return_value = {}  # Missing expected key
        mock_response.raise_for_status = lambda: None
        mock_requests_get.return_value = mock_response

        request = self.factory.get('/api/income-sheet/')
        response = views.income_sheet(request, self.symbol)
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.json())

    @patch('alpha_vantage.views.requests.get')
    @patch('alpha_vantage.views.cache.get')
    def test_financial_news_success(self, mock_cache_get, mock_requests_get):
        mock_cache_get.return_value = None
        mock_response = MagicMock()
        mock_response.json.return_value = {
            'feed': [{'title': 'Market Update'}]
        }
        mock_response.raise_for_status = lambda: None
        mock_requests_get.return_value = mock_response

        request = self.factory.get('/api/financial-news/')
        response = views.financial_news(request, self.symbol)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['source'], 'api')
        self.assertIn('title', response.json()['data'][0])

