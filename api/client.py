import requests
import logging
from typing import Optional, Dict, List

logging.basicConfig(level=logging.ERROR)

class Client:
    """
    A client for interacting with the Portfolio Optimizer API.
    """
    BASE_URL = "https://api.portfoliooptimizer.io/v1"
    TIMEOUT = 5

    @classmethod
    def analyze_absorption_ratio(cls, assets: int, covariance_matrix: list[list[float]]) -> Optional[float]:
        """
        Analyzes the absorption ratio given the number of assets and their covariance matrix.
        
        Parameters:
            assets (int): The number of assets.
            covariance_matrix (list[list[float]]): A 2D list representing the covariance matrix of the assets.
        
        Returns:
            float or None: The absorption ratio, or None if an error occurred.
        """
        endpoint = "/assets/analysis/absorption-ratio"
        url = f"{cls.BASE_URL}{endpoint}"

        payload = {
            "assets": assets,
            "assetsCovarianceMatrix": covariance_matrix
        }

        json_response = cls.post_request(url, payload)  

        return json_response.get("assetsAbsorptionRatio") if json_response else None

    @classmethod
    def diversification_ratio(cls, assets: int, asset_covariance_matrix: list[list[float]], portfolios: list[dict]) -> Optional[List[float]]:
        """
        Analyzes how well diversified the portfolio is.
        
        Parameters:
            assets (int): The number of assets.
            asset_covariance_matrix (list[list[float]]): A 2D list representing the covariance matrix of the assets.
            portfolios (list[dict]): A list of portfolio dictionaries.
        
        Returns:
            list[float] or None: A list of diversification ratios for each portfolio, or None if an error occurred.
        """
        endpoint = "/portfolio/analysis/diversification-ratio"
        url = f"{cls.BASE_URL}{endpoint}"

        payload = {
            "assets": assets,
            "assetsCovarianceMatrix": asset_covariance_matrix,
            "portfolios": portfolios,  
        }

        json_response = cls.post_request(url, payload)  

        ratios = [portfolio.get("portfolioDiversificationRatio") for portfolio in json_response.get("portfolios", [])] if json_response else None

        return ratios

    @classmethod
    def drawdown_ratio(cls, portfolios: list[Dict[str, List[float]]]) -> Optional[Dict]:
        """
        Analyzes the drawdown ratios of the given portfolios.
        
        Parameters:
            portfolios (list[dict]): A list of dictionaries, each containing 'portfolioValues', 
            which is a list of float values representing the portfolio's values over time.
        
        Returns:
            dict or None: A dictionary containing drawdown information for each portfolio, or None if an error occurred.
        """
        endpoint = "/portfolio/analysis/drawdowns"
        url = f"{cls.BASE_URL}{endpoint}"

        payload = {
            "portfolios": portfolios  
        }

        json_response = cls.post_request(url, payload) 

        # Return the full response including both drawdowns and worst drawdowns
        return json_response if json_response else None


    @classmethod
    def sharpe_ratio(cls, assets: int, assets_returns: List[float], assets_covariance_matrix: list[list[float]], 
                     risk_free_rate: float, portfolios: List[dict]) -> Optional[List[float]]:
        """
        Analyzes the Sharpe ratio of the given portfolios.

        Parameters:
            assets (int): The number of assets.
            assets_returns (list[float]): A list of expected returns for the assets.
            assets_covariance_matrix (list[list[float]]): A 2D list representing the covariance matrix of the assets.
            risk_free_rate (float): The risk-free rate of return.
            portfolios (list[dict]): A list of portfolio dictionaries containing asset weights.
        
        Returns:
            list[float] or None: A list of Sharpe ratios for each portfolio, or None if an error occurred.
        """
        endpoint = "/portfolio/analysis/sharpe-ratio"
        url = f"{cls.BASE_URL}{endpoint}"

        payload = {
            "assets": assets,
            "assetsReturns": assets_returns,
            "assetsCovarianceMatrix": assets_covariance_matrix,
            "riskFreeRate": risk_free_rate,
            "portfolios": portfolios,
        }

        json_response = cls.post_request(url, payload)  

        sharpe_ratios = [portfolio.get("portfolioSharpeRatio") for portfolio in json_response.get("portfolios", [])] if json_response else None

        return sharpe_ratios

    @classmethod
    def investable_portfolio(cls, assets: int, asset_prices: List[float], asset_weights: List[float], portfolio_value: float) -> Optional[Dict[str, List[float]]]:
        """
        Constructs an investable portfolio by determining the asset positions and weights 
        based on the given asset prices, target portfolio value, and asset weights.

        Parameters:
            assets (int): The number of assets in the portfolio.
            asset_prices (List[float]): A list of float values representing the prices of each asset.
            asset_weights (List[float]): A list of float values representing the desired weights of each asset in the portfolio.
            portfolio_value (float): The total value of the portfolio.

        Returns:
            dict or None: A dictionary containing the calculated 'assetsPositions' and 'assetsWeights' from the API, 
            or None if an error occurred.
        """

        endpoint = "/portfolio/construction/investable"
        url = f"{cls.BASE_URL}{endpoint}"

        # Adjust payload field names to match expected API format
        payload = {
            "assets": assets,
            "assetPrices": asset_prices,  # Correct field name
            "assetWeights": asset_weights,  # Correct field name
            "portfolioValue": portfolio_value  # Correct field name
        }

        json_response = cls.post_request(url, payload, timeout=5)

        if json_response:
            # Return the required fields from the API response
            return {
                "assetsPositions": json_response.get("assetsPositions"),
                "assetsWeights": json_response.get("assetsWeights")
            }

        return None

    @classmethod
    def optimize_portfolio(cls, assets: int, assets_returns: list[float], max_assets_weights: list[float]) -> Optional[Dict]:
        """
        Optimizes the portfolio given the number of assets, their returns, and the constraints.
        
        Parameters:
            assets (int): The number of assets.
            assets_returns (list[float]): The expected returns for each asset.
            max_assets_weights (list[float]): The maximum allowed weight for each asset in the portfolio.
            
        Returns:
            dict or None: The optimized portfolio weights or None if an error occurred.
        """
        endpoint = "/portfolio/optimization"
        url = f"{cls.BASE_URL}{endpoint}"

        payload = {
            "assets": assets,
            "assetsReturns": assets_returns,
            "constraints": {
                "maximumAssetsWeights": max_assets_weights
            }
        }

        json_response = cls.post_request(url, payload)

        return json_response.get("assetsWeights") if json_response else None

    @classmethod
    def post_request(cls, url: str, payload: dict) -> Optional[dict]:
        """
        Helper function to make a POST request to a given URL with the specified payload.

        Parameters:
            url (str): The URL to which the request is sent.
            payload (dict): The JSON payload to be sent in the request.

        Returns:
            dict or None: The JSON response from the server, or None if an error occurred.
        """
        try:
            response = requests.post(url, json=payload, timeout=cls.TIMEOUT)
            response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
            return response.json()  # Return parsed JSON data
        except requests.exceptions.RequestException as e:
            logging.error(f"An error occurred: {e}")
            return None