from django.http import JsonResponse
from rest_framework.decorators import api_view
from .client import Client  # Assuming Client is in client.py
from tradingbot.tradingbot import MLTrader
from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime
from alpaca_trade_api.rest import REST, TimeFrame
from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime 
from alpaca_trade_api import REST 
from timedelta import Timedelta 
from alpaca_trade_api.rest import REST, TimeFrame
from tradingbot.tasks import run_trading_bot
import os
import re
import logging

logger = logging.getLogger(__name__)  

@api_view(['POST'])
def analyze_absorption_ratio_view(request):
    data = request.data
    assets = data.get('assets')
    covariance_matrix = data.get('assetsCovarianceMatrix')

    if assets is None or covariance_matrix is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        absorption_ratio = Client.analyze_absorption_ratio(assets, covariance_matrix)
        if absorption_ratio is not None:
            return JsonResponse({'assetsAbsorptionRatio': absorption_ratio}, status=200)
        else:
            return JsonResponse({'error': 'Failed to analyze absorption ratio'}, status=500)
    except Exception as e:
        logger.error(f"Error in analyze_absorption_ratio_view: {e}")
        return JsonResponse({'error': 'An error occurred while analyzing the absorption ratio'}, status=500)


@api_view(['POST'])
def diversification_ratio_view(request):
    data = request.data
    assets = data.get('assets')
    asset_covariance_matrix = data.get('assetsCovarianceMatrix')
    portfolios = data.get('portfolios')

    if assets is None or asset_covariance_matrix is None or portfolios is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        ratios = Client.diversification_ratio(assets, asset_covariance_matrix, portfolios)
        if ratios is not None:
            return JsonResponse({'diversificationRatios': ratios}, status=200)
        else:
            return JsonResponse({'error': 'Failed to analyze diversification ratio'}, status=500)
    except Exception as e:
        logger.error(f"Error in diversification_ratio_view: {e}")
        return JsonResponse({'error': 'An error occurred while analyzing the diversification ratio'}, status=500)


@api_view(['POST'])
def drawdown_ratio_view(request):
    data = request.data
    portfolios = data.get('portfolios')

    if portfolios is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        drawdowns = Client.drawdown_ratio(portfolios)
        if drawdowns is not None:
            return JsonResponse({'drawdowns': drawdowns}, status=200)
        else:
            return JsonResponse({'error': 'Failed to analyze drawdown ratio'}, status=500)
    except Exception as e:
        logger.error(f"Error in drawdown_ratio_view: {e}")
        return JsonResponse({'error': 'An error occurred while analyzing the drawdown ratio'}, status=500)


@api_view(['POST'])
def sharpe_ratio_view(request):
    data = request.data
    assets = data.get('assets')
    assets_returns = data.get('assetsReturns')
    assets_covariance_matrix = data.get('assetsCovarianceMatrix')
    risk_free_rate = data.get('riskFreeRate')
    portfolios = data.get('portfolios')

    if assets is None or assets_returns is None or assets_covariance_matrix is None or risk_free_rate is None or portfolios is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        sharpe_ratios = Client.sharpe_ratio(assets, assets_returns, assets_covariance_matrix, risk_free_rate, portfolios)
        if sharpe_ratios is not None:
            return JsonResponse({'sharpeRatios': sharpe_ratios}, status=200)
        else:
            return JsonResponse({'error': 'Failed to analyze Sharpe ratio'}, status=500)
    except Exception as e:
        logger.error(f"Error in sharpe_ratio_view: {e}")
        return JsonResponse({'error': 'An error occurred while analyzing the Sharpe ratio'}, status=500)


@api_view(['POST'])
def investable_portfolio_view(request):
    data = request.data
    assets = data.get('assets')
    asset_prices = data.get('assetPrices')
    asset_weights = data.get('assetWeights')
    portfolio_value = data.get('portfolioValue')

    if assets is None or asset_prices is None or asset_weights is None or portfolio_value is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        investable_portfolio = Client.investable_portfolio(assets, asset_prices, asset_weights, portfolio_value)
        if investable_portfolio is not None:
            return JsonResponse(investable_portfolio, status=200)
        else:
            return JsonResponse({'error': 'Failed to construct investable portfolio'}, status=500)
    except Exception as e:
        logger.error(f"Error in investable_portfolio_view: {e}")
        return JsonResponse({'error': 'An error occurred while constructing the investable portfolio'}, status=500)


@api_view(['POST'])
def optimize_portfolio_view(request):
    data = request.data
    assets = data.get('assets')
    assets_returns = data.get('assetsReturns')
    max_assets_weights = data.get('maxAssetsWeights')

    if assets is None or assets_returns is None or max_assets_weights is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    try:
        optimized_weights = Client.optimize_portfolio(assets, assets_returns, max_assets_weights)
        if optimized_weights is not None:
            return JsonResponse({'optimizedWeights': optimized_weights}, status=200)
        else:
            return JsonResponse({'error': 'Failed to optimize portfolio'}, status=500)
    except Exception as e:
        logger.error(f"Error in optimize_portfolio_view: {e}")
        return JsonResponse({'error': 'An error occurred while optimizing the portfolio'}, status=500)

@api_view(['POST'])
def run_strategy(request):
    try:
        # Get API credentials and validate inputs
        API_KEY = os.getenv("API_KEY_PAPER")
        API_SECRET = os.getenv("API_SECRET_PAPER")
        BASE_URL = os.getenv("BASE_URL_PAPER")

        if not all([API_KEY, API_SECRET, BASE_URL]):
            return JsonResponse(
                {'error': 'API credentials are not properly configured in environment variables.'}, 
                status=500
            )

        symbol = request.data.get('symbol', 'SPY')
        startDateRequest = request.data.get('startDate', '2023-11-30')
        endDateRequest = request.data.get('endDate', '2023-12-31')

        try:
            start_date = datetime.strptime(startDateRequest, '%Y-%m-%d')
            end_date = datetime.strptime(endDateRequest, '%Y-%m-%d')
        except ValueError:
            return JsonResponse(
                {'error': 'Invalid date format. Use YYYY-MM-DD.'}, 
                status=400
            )

        cash_at_risk = request.data.get('cash_at_risk', 0.5)
        
        try:
            cash_at_risk = float(cash_at_risk)
        except ValueError:
            return JsonResponse(
                {'error': 'Invalid cash_at_risk value. It should be a number between 0 and 1.'}, 
                status=400
            )

        if not (0 <= cash_at_risk <= 1):
            return JsonResponse(
                {'error': 'Invalid cash_at_risk. It should be between 0 and 1.'}, 
                status=400
            )

        # Call the Celery task asynchronously
        run_trading_bot.delay(symbol, start_date, end_date, cash_at_risk)

        # Return response immediately
        return JsonResponse({
            'status': 'success',
            'message': 'Strategy backtest is running in the background.'
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
