// api.test.js
import {
    analyzeAbsorptionRatio,
    analyzeDiversificationRatio,
    analyzeDrawdownRatio,
    analyzeSharpeRatio,
    createInvestablePortfolio,
    optimizePortfolio
  } from '../components/apiClient';
  
  global.fetch = jest.fn(); // Mock the fetch function
  
  describe('API Function Tests', () => {
  
    afterEach(() => {
      fetch.mockClear(); // Clear the fetch mock after each test
    });
  
    test('analyzeAbsorptionRatio should send correct body data', async () => {
      const mockResponse = { ratio: 0.75 }; // Mocked response from server
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeAbsorptionRatio(3, '[[1, 2], [2, 3]]');
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/absorption-ratio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: 3,
          assetsCovarianceMatrix: [[1, 2], [2, 3]],
        }),
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    test('analyzeDiversificationRatio should send correct body data', async () => {
      const mockResponse = { ratio: 0.85 }; // Mocked response from server
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeDiversificationRatio(3, '[[1, 0], [0, 1]]', '[{"portfolio": "A"}, {"portfolio": "B"}]');
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/diversification-ratio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: 3,
          assetsCovarianceMatrix: [[1, 0], [0, 1]],
          portfolios: [{ portfolio: 'A' }, { portfolio: 'B' }],
        }),
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    test('analyzeDrawdownRatio should send correct body data', async () => {
      const mockResponse = { drawdowns: [0.2, 0.15] }; // Mocked response from server
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await analyzeDrawdownRatio('[{"portfolio": "A"}, {"portfolio": "B"}]');
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/analyze/drawdowns/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolios: '[{"portfolio": "A"}, {"portfolio": "B"}]' }),
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    test('createInvestablePortfolio should send correct body data', async () => {
      const mockResponse = { portfolio: { value: 10000 } }; // Mocked response from server
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await createInvestablePortfolio(3, '[10, 25, 500]', '[0.05, 0.6, 0.35]', 10000);
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/portfolio/investable/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: 3,
          assetsPrices: [10, 25, 500],
          assetsWeights: [0.05, 0.6, 0.35],
          portfolioValue: 10000,
        }),
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    test('optimizePortfolio should send correct body data', async () => {
      const mockResponse = { optimized: true }; // Mocked response from server
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
  
      const result = await optimizePortfolio(3, '[0.05, 0.1]', '{"maxWeights": [0.3, 0.7]}');
  
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/portfolio/optimize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: 3,
          assetsReturns: [0.05, 0.1],
          constraints: { maxWeights: [0.3, 0.7] },
        }),
      });
  
      expect(result).toEqual(mockResponse);
    });
  
  });
  