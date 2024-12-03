const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust the URL based on your server

// Function to analyze absorption ratio
export const analyzeAbsorptionRatio = async (assets, covarianceArray) => {
  const bodyData = {
      assets: Number(assets),  // Ensure assets is a number
      assetsCovarianceMatrix: JSON.parse(covarianceArray) // This should be an array (e.g., [[9, 1], [1, 1]])
  };

  try {
      const response = await fetch(`${API_BASE_URL}/analyze/absorption-ratio/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Add JWT token here if needed, e.g. Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(bodyData),  // Convert body to JSON string
      });

      if (!response.ok) {
          // Log the error response for debugging
          const errorData = await response.json();
          throw new Error('Failed to fetch: ', errorData);
      }

      const result = await response.json();  // Parse and return the JSON response
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
  // Construct the request body by parsing and organizing the input data
  const bodyData = {
    assets: Number(assets),  // Convert assets to a number 
    assetsReturns: JSON.parse(returns), 
    assetsCovarianceMatrix: JSON.parse(covarianceMatrix),    // Parse covariance matrix string to object
    riskFreeRate: riskFreeRate,  // Use risk-free rate as provided
    portfolios: JSON.parse(portfolios)  // Parse portfolios string to object
  };

  // Send the POST request to the Sharpe ratio analysis endpoint
  const response = await fetch(`${API_BASE_URL}/analyze/sharpe-ratio/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Set content type to JSON
    },
    body: JSON.stringify(bodyData),  // Send the bodyData as a JSON string
  });

  // Return the parsed JSON response from the server
  return response.json();
};


// Function to create an investable portfolio
export const createInvestablePortfolio = async (assets, prices, weights, portfolioValue) => {

  const bodyData = 
  {
    assets: Number(assets),
    assetsPrices: JSON.parse(prices),
    assetsWeights: JSON.parse(weights),
    portfolioValue: Number(portfolioValue)
  }

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
  const bodyData = {
    "assets": Number(assets),
    "assetsReturns": JSON.parse(returns),
    "constraints": JSON.parse(maxWeights),
  }

  const response = await fetch(`${API_BASE_URL}/portfolio/optimize/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
  return response.json();
};

// Function to call trading bot
export const tradingBot = async (symbol, startDate, endDate) => {
  const bodyData = {
    "symbol": symbol,
    "startDate": startDate,
    "endDate": endDate
  }

  const response = await fetch(`${API_BASE_URL}/run_strategy/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })

  console.log(response);
  return response.json();
}
