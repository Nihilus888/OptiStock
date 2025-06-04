from django.test import TestCase, RequestFactory
from unittest.mock import patch, MagicMock
from django.http import JsonResponse

from alphavantage import views

class FinancialDataViewTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.symbol = "AAPL"
