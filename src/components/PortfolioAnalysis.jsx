import React, { useState, useEffect, useCallback } from 'react';
import {
  analyzeAbsorptionRatio,
  analyzeDiversificationRatio,
  analyzeSharpeRatio,
  createInvestablePortfolio,
  analyzeDrawdownRatio,
} from './apiClient';

const PortfolioAnalysis = () => {
  const [activeTab, setActiveTab] = useState('absorption');
  const [assets, setAssets] = useState(0);
  const [covarianceMatrix, setCovarianceMatrix] = useState('');
  const [assetsReturns, setAssetsReturns] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState(0);
  const [portfolios, setPortfolios] = useState('');
  const [assetPrices, setAssetPrices] = useState('');
  const [assetWeights, setAssetWeights] = useState('');
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [results, setResults] = useState(null);
  const [drawdownRatio, setDrawdownRatio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDrawdownRatio = useCallback(async () => {
    setLoading(true);
    try {
      const data = await analyzeDrawdownRatio(portfolios);
      setDrawdownRatio(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch drawdown ratio');
    } finally {
      setLoading(false);
    }
  }, [portfolios]);

  useEffect(() => {
    if (activeTab === 'drawdown') {
      fetchDrawdownRatio();
    }
  }, [activeTab, fetchDrawdownRatio]);

  const handleAbsorptionSubmit = async (event) => {
    event.preventDefault();
    try {
      const covarianceArray = JSON.parse(covarianceMatrix)
      const absorptionRatio = await analyzeAbsorptionRatio(assets, covarianceArray);
      setResults(absorptionRatio);
      setError('');
    } catch (err) {
      setError('An error occurred while analyzing the data.');
      setResults(null);
    }
  };

  const handleDiversificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const covarianceArray = JSON.parse(covarianceMatrix);
      const portfoliosArray = JSON.parse(portfolios);
      const diversificationRatio = await analyzeDiversificationRatio(assets, covarianceArray, portfoliosArray);
      setResults(diversificationRatio);
      setError('');
    } catch (err) {
      setError('An error occurred while analyzing the data.');
      setResults(null);
    }
  };

  const handleSharpeSubmit = async (event) => {
    event.preventDefault();
    try {
      const covarianceArray = JSON.parse(covarianceMatrix);
      const returnsArray = JSON.parse(assetsReturns);
      const portfoliosArray = JSON.parse(portfolios);
      const sharpeRatio = await analyzeSharpeRatio(assets, returnsArray, covarianceArray, riskFreeRate, portfoliosArray);
      setResults(sharpeRatio);
      setError('');
    } catch (err) {
      setError('An error occurred while analyzing the data.');
      setResults(null);
    }
  };

  const handleInvestablePortfolioSubmit = async (event) => {
    event.preventDefault();
    try {
      const pricesArray = JSON.parse(assetPrices);
      const weightsArray = JSON.parse(assetWeights);
      const investablePortfolio = await createInvestablePortfolio(assets, pricesArray, weightsArray, portfolioValue);
      setResults(investablePortfolio);
      setError('');
    } catch (err) {
      setError('An error occurred while creating the investable portfolio.');
      setResults(null);
    }
  };

  return (
    <div className="justify-center items-center bg-black">
        <div className="p-4 max-w-lg mx-auto bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Portfolio Analysis</h2>

        <div className="flex space-x-">
            <button
            onClick={() => setActiveTab('absorption')}
            className={`px-4 py-2 rounded ${activeTab === 'absorption' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
            >
            Absorption Ratio
            </button>
            <button
            onClick={() => setActiveTab('diversification')}
            className={`px-4 py-2 rounded ${activeTab === 'diversification' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
            >
            Diversification Ratio
            </button>
            <button
            onClick={() => setActiveTab('sharpe')}
            className={`px-4 py-2 rounded ${activeTab === 'sharpe' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
            >
            Sharpe Ratio
            </button>
            <button
            onClick={() => setActiveTab('investable')}
            className={`px-4 py-2 rounded ${activeTab === 'investable' ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'}`}
            >
            Investable Portfolio
            </button>
        </div>

        {/* Forms */}
        {activeTab === 'absorption' && (
            <form onSubmit={handleAbsorptionSubmit} className="space-y-4">
            <div className="h-50">
                <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
                <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <div className="h-30">
                <label className="block text-sm font-medium mb-1 text-white">Covariance Matrix (JSON format)</label>
                <textarea
                value={covarianceMatrix}
                onChange={(e) => setCovarianceMatrix(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 mb-20"
            >
                Analyze Absorption Ratio
            </button>
            </form>
        )}

        {activeTab === 'diversification' && (
            <form onSubmit={handleDiversificationSubmit} className="space-y-4">
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
                <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Covariance Matrix (JSON format)</label>
                <textarea
                value={covarianceMatrix}
                onChange={(e) => setCovarianceMatrix(e.target.value)}
                className="border border-gray-300 p-1 rounded w-full"
                rows={4}
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Portfolios (JSON format)</label>
                <textarea
                value={portfolios}
                onChange={(e) => setPortfolios(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
                Analyze Diversification Ratio
            </button>
            </form>
        )}

        {activeTab === 'sharpe' && (
            <form onSubmit={handleSharpeSubmit} className="space-y-4">
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
                <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Covariance Matrix (JSON format)</label>
                <textarea
                value={covarianceMatrix}
                onChange={(e) => setCovarianceMatrix(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Assets Returns (JSON format)</label>
                <textarea
                value={assetsReturns}
                onChange={(e) => setAssetsReturns(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Risk-Free Rate</label>
                <input
                type="number"
                value={riskFreeRate}
                onChange={(e) => setRiskFreeRate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Portfolios (JSON format)</label>
                <textarea
                value={portfolios}
                onChange={(e) => setPortfolios(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
                Analyze Sharpe Ratio
            </button>
            </form>
        )}

        {/* Investable Portfolio Form */}
        {activeTab === 'investable' && (
            <form onSubmit={handleInvestablePortfolioSubmit} className="space-y-4">
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
                <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Asset Prices (JSON format)</label>
                <textarea
                value={assetPrices}
                onChange={(e) => setAssetPrices(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Asset Weights (JSON format)</label>
                <textarea
                value={assetWeights}
                onChange={(e) => setAssetWeights(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
                />
            </div>
            <div className="h-24">
                <label className="block text-sm font-medium mb-1 text-white">Portfolio Value</label>
                <input
                type="number"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
                Create Investable Portfolio
            </button>
            </form>
        )}

        {/* Drawdown Ratio Section */}
        {activeTab === 'drawdown' && (
            <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Drawdown Ratio</h3>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : drawdownRatio ? (
                <p className="text-white">{JSON.stringify(drawdownRatio)}</p>
            ) : (
                <p className="text-white">No data available.</p>
            )}
            </div>
        )}

        {/* Results and Error Display */}
        {results && (
            <div className="mt-4 p-4 bg-gray-800 rounded">
            <h3 className="text-lg font-semibold text-white">Results:</h3>
            <pre className="text-white">{JSON.stringify(results, null, 2)}</pre>
            </div>
        )}
        {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>{error}</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default PortfolioAnalysis;
