const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust the URL based on your server

// Function to analyze absorption ratio
export const analyzeAbsorptionRatio = async (assets, covarianceArray) => {
  const response = await fetch(`${API_BASE_URL}/analyze/absorption-ratio/`, {
    method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            assets: assets,
            assetsCovarianceMatrix: covarianceArray  // Ensure the key matches the backend
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return await response.json();
};

// Function to analyze diversification ratio
export const analyzeDiversificationRatio = async (assets, covarianceMatrix, portfolios) => {
  const response = await fetch(`${API_BASE_URL}/analyze/diversification-ratio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assets,
      assetsCovarianceMatrix: covarianceMatrix,
      portfolios,
    }),
  });
  return response.json();
};

// Function to analyze drawdown ratio
export const analyzeDrawdownRatio = async (portfolios) => {
  const response = await fetch(`${API_BASE_URL}/analyze/drawdowns/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ portfolios }),
  });
  return response.json();
};

// Function to analyze Sharpe ratio
export const analyzeSharpeRatio = async (assets, returns, covarianceMatrix, riskFreeRate, portfolios) => {
  const response = await fetch(`${API_BASE_URL}/analyze/sharpe-ratio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assets,
      assetsReturns: returns,
      assetsCovarianceMatrix: covarianceMatrix,
      riskFreeRate,
      portfolios,
    }),
  });
  return response.json();
};

// Function to create an investable portfolio
export const createInvestablePortfolio = async (assets, prices, weights, portfolioValue) => {
  const response = await fetch(`${API_BASE_URL}/portfolio/investable/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assets,
      assetPrices: prices,
      assetWeights: weights,
      portfolioValue,
    }),
  });
  return response.json();
};

// Function to optimize portfolio
export const optimizePortfolio = async (assets, returns, maxWeights) => {
  const response = await fetch(`${API_BASE_URL}/portfolio/optimize/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assets,
      assetsReturns: returns,
      constraints: { maximumAssetsWeights: maxWeights },
    }),
  });
  return response.json();
};
