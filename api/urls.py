# urls.py
from django.urls import path
from .views import (
    analyze_absorption_ratio_view,
    diversification_ratio_view,
    drawdown_ratio_view,
    sharpe_ratio_view,
    investable_portfolio_view,
    optimize_portfolio_view
)

urlpatterns = [
    path('analyze/absorption-ratio/', analyze_absorption_ratio_view, name='analyze_absorption_ratio'),
    path('analyze/diversification-ratio/', diversification_ratio_view, name='diversification_ratio'),
    path('analyze/drawdowns/', drawdown_ratio_view, name='drawdown_ratio'),
    path('analyze/sharpe-ratio/', sharpe_ratio_view, name='sharpe_ratio'),
    path('portfolio/investable/', investable_portfolio_view, name='investable_portfolio'),
    path('portfolio/optimize/', optimize_portfolio_view, name='optimize_portfolio'),
]
