import {
    analyzeAbsorptionRatio,
    analyzeDiversificationRatio,
    analyzeDrawdownRatio,
    analyzeSharpeRatio,
    createInvestablePortfolio,
    optimizePortfolio
  } from '../components/apiClient'; // Adjust the path
  
  // Mock the fetch function globally
  global.fetch = jest.fn();
  
  describe('API Functions', () => {
    beforeEach(() => {
      fetch.mockClear(); // Clear mock calls before each test
    });
  
    it('should analyze absorption ratio successfully', async () => {
      const mockResponse = { result: 'success' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
  
      const result = await analyzeAbsorptionRatio(['AAPL', 'MSFT'], [[1, 0], [0, 1]]);
      
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/absorption-ratio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: ['AAPL', 'MSFT'],
          assetsCovarianceMatrix: [[1, 0], [0, 1]],
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should throw an error when analyze absorption ratio fails', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });
  
      await expect(analyzeAbsorptionRatio(['AAPL'], [[1]])).rejects.toThrow('Failed to fetch');
    });
  
    it('should analyze diversification ratio successfully', async () => {
      const mockResponse = { result: 'diversification' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeDiversificationRatio(['AAPL'], [[1]], [{ AAPL: 0.5 }]);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/diversification-ratio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: ['AAPL'],
          assetsCovarianceMatrix: [[1]],
          portfolios: [{ AAPL: 0.5 }],
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should analyze drawdown ratio successfully', async () => {
      const mockResponse = { result: 'drawdown' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeDrawdownRatio([{ AAPL: 0.5 }]);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/drawdowns/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolios: [{ AAPL: 0.5 }],
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should analyze Sharpe ratio successfully', async () => {
      const mockResponse = { result: 'sharpe' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeSharpeRatio(['AAPL'], [0.01], [[1]], 0.02, [{ AAPL: 0.5 }]);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/sharpe-ratio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: ['AAPL'],
          assetsReturns: [0.01],
          assetsCovarianceMatrix: [[1]],
          riskFreeRate: 0.02,
          portfolios: [{ AAPL: 0.5 }],
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should create an investable portfolio successfully', async () => {
      const mockResponse = { portfolio: 'created' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await createInvestablePortfolio(['AAPL'], [100], [0.5], 500);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/portfolio/investable/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: ['AAPL'],
          assetPrices: [100],
          assetWeights: [0.5],
          portfolioValue: 500,
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  
    it('should optimize a portfolio successfully', async () => {
      const mockResponse = { portfolio: 'optimized' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await optimizePortfolio(['AAPL'], [0.01], [0.5]);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/portfolio/optimize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: ['AAPL'],
          assetsReturns: [0.01],
          constraints: { maximumAssetsWeights: [0.5] },
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  });
  