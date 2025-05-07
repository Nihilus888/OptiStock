from django.test import TestCase
from unittest.mock import patch
from api.client import Client  # Adjust this based on where your Client class is located

class ClientTestCase(TestCase):

    @patch('api.client.Client.post_request') 
    def test_analyze_absorption_ratio_success(self, mock_post_request):
        mock_post_request.return_value = {
            "assetsAbsorptionRatio": 0.85
        }

        assets = 5
        covariance_matrix = [[0.1, 0.2], [0.2, 0.3]]
        result = Client.analyze_absorption_ratio(assets, covariance_matrix)

        self.assertEqual(result, 0.85, "Expected absorption ratio to be 0.85")

    @patch('api.client.Client.post_request') 
    def test_diversification_ratio(self, mock_post_request):
        mock_post_request.return_value = {
            "portfolios": [
                {
                    "portfolioDiversificationRatio": 1.2909944487358058
                }
            ]
        }

        assets = 2
        asset_covariance_matrix = [
            [0.0025, 0.0005],
            [0.0005, 0.01]
        ]
        portfolios = [
            {
                "assetsWeights": [0.5, 0.5]
            }
        ]

        result = Client.diversification_ratio(assets, asset_covariance_matrix, portfolios)

        self.assertEqual(result, [1.2909944487358058], "diversification ratio is not correct")

    @patch('api.client.Client.post_request') 
    def test_drawdown_ratio(self, mock_post_request):
        mock_post_request.return_value = {
            "portfolios": [
                {
                    "portfolioDrawdowns": [
                        0,
                        0.05,
                        0,
                        0.1,
                        0.15,
                        0.3
                    ],
                    "portfolioWorstDrawdowns": [
                        {
                            "drawdownDepth": 0.3,
                            "drawdownStart": 3,
                            "drawdownBottom": 6,
                            "drawdownEnd": 0
                        },
                        {
                            "drawdownDepth": 0.05,
                            "drawdownStart": 1,
                            "drawdownBottom": 2,
                            "drawdownEnd": 3
                        }
                    ]
                }
            ]
        }

        portfolios = [
            {
                "portfolioValues": [
                    100, 95, 100, 90, 85, 70
                ]
            }
        ]

        result = Client.drawdown_ratio(portfolios)

        # The result is expected to be in a dictionary format with a "portfolios" key.
        expected_result = {
            "portfolios": [
                {
                    "portfolioDrawdowns": [0, 0.05, 0, 0.1, 0.15, 0.3],
                    "portfolioWorstDrawdowns": [
                        {
                            "drawdownDepth": 0.3,
                            "drawdownStart": 3,
                            "drawdownBottom": 6,
                            "drawdownEnd": 0
                        },
                        {
                            "drawdownDepth": 0.05,
                            "drawdownStart": 1,
                            "drawdownBottom": 2,
                            "drawdownEnd": 3
                        }
                    ]
                }
            ]
        }

        self.assertEqual(result, expected_result, "drawdown ratio is not correct")

    @patch('api.client.Client.post_request') 
    def test_sharpe_ratio(self, mock_post_request):
        mock_post_request.return_value = {
            "portfolios": [
                {
                    "portfolioSharpeRatio": 0.19999999999999998
                },
                {
                    "portfolioSharpeRatio": 0.5
                }
            ]
        }

        assets = 2
        asset_returns = [0.01, 0.05]
        assets_covariance_matrix = [
            [0.0025, 0.0005],
            [0.0005, 0.01]
        ]
        risk_free_rate = 0
        portfolio = [
            {"assetsWeights": [1, 0]},
            {"assetsWeights": [0, 1]}
        ]

        result = Client.sharpe_ratio(assets, asset_returns, assets_covariance_matrix, risk_free_rate, portfolio)

        self.assertEqual(result, [0.19999999999999998, 0.5], "sharpe ratio is not correct")

    @patch('api.client.Client.post_request')    
    def test_optimize_portfolio(self, mock_post_request):   
        mock_post_request.return_value = {
            "assetsWeights": [
                0.3999999780097259,
                0.6000000219902976
            ]
        }

        assets = 2 
        asset_returns = [0.02, 0.01]
        max_asset_weights = [
            {
                'constraints': {
                    "maximumAssetsWeights": [
                        0.4,
                        1
                    ]
                } 
            }
        ]

        result = Client.optimize_portfolio(assets, asset_returns, max_asset_weights)
        
        self.assertEqual(result, [0.3999999780097259, 0.6000000219902976], "optimize portfolio is not correct")