# views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .client import Client  # Assuming Client is in client.py

@api_view(['POST'])
def analyze_absorption_ratio_view(request):
    data = request.data
    assets = data.get('assets')
    covariance_matrix = data.get('assetsCovarianceMatrix')

    if assets is None or covariance_matrix is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    absorption_ratio = Client.analyze_absorption_ratio(assets, covariance_matrix)

    if absorption_ratio is not None:
        return JsonResponse({'assetsAbsorptionRatio': absorption_ratio}, status=200)
    else:
        return JsonResponse({'error': 'Failed to analyze absorption ratio'}, status=500)


@api_view(['POST'])
def diversification_ratio_view(request):
    data = request.data
    assets = data.get('assets')
    asset_covariance_matrix = data.get('assetsCovarianceMatrix')
    portfolios = data.get('portfolios')

    if assets is None or asset_covariance_matrix is None or portfolios is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    ratios = Client.diversification_ratio(assets, asset_covariance_matrix, portfolios)

    if ratios is not None:
        return JsonResponse({'diversificationRatios': ratios}, status=200)
    else:
        return JsonResponse({'error': 'Failed to analyze diversification ratio'}, status=500)


@api_view(['POST'])
def drawdown_ratio_view(request):
    data = request.data
    portfolios = data.get('portfolios')

    if portfolios is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    drawdowns = Client.drawdown_ratio(portfolios)

    if drawdowns is not None:
        return JsonResponse({'drawdowns': drawdowns}, status=200)
    else:
        return JsonResponse({'error': 'Failed to analyze drawdown ratio'}, status=500)


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

    sharpe_ratios = Client.sharpe_ratio(assets, assets_returns, assets_covariance_matrix, risk_free_rate, portfolios)

    if sharpe_ratios is not None:
        return JsonResponse({'sharpeRatios': sharpe_ratios}, status=200)
    else:
        return JsonResponse({'error': 'Failed to analyze Sharpe ratio'}, status=500)


@api_view(['POST'])
def investable_portfolio_view(request):
    data = request.data
    assets = data.get('assets')
    asset_prices = data.get('assetPrices')
    asset_weights = data.get('assetWeights')
    portfolio_value = data.get('portfolioValue')

    if assets is None or asset_prices is None or asset_weights is None or portfolio_value is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    investable_portfolio = Client.investable_portfolio(assets, asset_prices, asset_weights, portfolio_value)

    if investable_portfolio is not None:
        return JsonResponse(investable_portfolio, status=200)
    else:
        return JsonResponse({'error': 'Failed to construct investable portfolio'}, status=500)


@api_view(['POST'])
def optimize_portfolio_view(request):
    data = request.data
    assets = data.get('assets')
    assets_returns = data.get('assetsReturns')
    max_assets_weights = data.get('maxAssetsWeights')

    if assets is None or assets_returns is None or max_assets_weights is None:
        return JsonResponse({'error': 'Missing required fields'}, status=400)

    optimized_weights = Client.optimize_portfolio(assets, assets_returns, max_assets_weights)

    if optimized_weights is not None:
        return JsonResponse({'optimizedWeights': optimized_weights}, status=200)
    else:
        return JsonResponse({'error': 'Failed to optimize portfolio'}, status=500)
