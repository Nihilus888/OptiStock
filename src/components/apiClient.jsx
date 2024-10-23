const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust the URL based on your server

// Function to analyze absorption ratio
export const analyzeAbsorptionRatio = async (assets, covarianceArray) => {
  const bodyData = {
      assets: Number(assets),  // Ensure assets is a number
      assetsCovarianceMatrix: JSON.parse(covarianceArray) // This should be an array (e.g., [[9, 1], [1, 1]])
  };

  console.log('Request body:', bodyData);  // Log the request body to ensure correct types

  try {
      const response = await fetch(`${API_BASE_URL}/analyze/absorption-ratio/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add JWT token here if needed, e.g. Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(bodyData),  // Convert body to JSON string
      });

      console.log('Raw Response:', response);  // Log the raw response

      if (!response.ok) {
          // Log the error response for debugging
          const errorData = await response.json();
          console.error('Error Response:', errorData);
          throw new Error('Failed to fetch');
      }

      const result = await response.json();  // Parse and return the JSON response
      console.log('Parsed Response:', result);
      return result;

  } catch (error) {
      console.error('Request failed:', error);  // Handle error accordingly
      throw error;
  }
};


// Function to analyze diversification ratio
export const analyzeDiversificationRatio = async (assets, covarianceMatrix, portfolios) => {
  const bodyData = 
  {
    assets: Number(assets),  // Ensure assets is a number
    assetsCovarianceMatrix: JSON.parse(covarianceMatrix), // Assuming covarianceMatrix is already an array
    portfolios: JSON.parse(portfolios) // Assuming portfolios is already an array of objects
  };

  console.log('bodyData', bodyData);
  const response = await fetch(`${API_BASE_URL}/analyze/diversification-ratio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData), // Send the structured bodyData
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
  const bodyData = {
    assets: Number(assets),
    covarianceMatrix: JSON.parse(covarianceMatrix),
    assetReturns: JSON.parse(returns),
    riskFreeRate: JSON.parse(riskFreeRate),
    portfolios: JSON.parse(portfolios)
  }


  const response = await fetch(`${API_BASE_URL}/analyze/sharpe-ratio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
  return response.json();
};

// Function to create an investable portfolio
export const createInvestablePortfolio = async (assets, prices, weights, portfolioValue) => {

  const bodyData = 
  {
    "assets": 2,
    "assetsPrices": [100, 200],  // Sample data for asset prices
    "assetsWeights": [0.5, 0.5],  // Sample data for asset weights
    "portfolioValue": 1000         // Sample portfolio value
  }
  /*
  {
    assets: Number(assets),
    assetsPrices: JSON.parse(prices),
    assetsWeights: JSON.parse(weights),
    portfolioValue: Number(portfolioValue)
  }
  */
  console.log(bodyData);

  const response = await fetch(`${API_BASE_URL}/portfolio/investable/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
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
