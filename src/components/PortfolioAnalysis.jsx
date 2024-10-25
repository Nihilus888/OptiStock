import React, { useState } from 'react';
import {
  analyzeAbsorptionRatio,
  analyzeDiversificationRatio,
} from './apiClient';

const PortfolioAnalysis = () => {
  const [activeTab, setActiveTab] = useState('absorption');
  const [assets, setAssets] = useState(0);
  const [covarianceMatrix, setCovarianceMatrix] = useState('');
  const [portfolios, setPortfolios] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleAbsorptionSubmit = async (event) => {
    event.preventDefault();
    try {
      const absorptionRatio = await analyzeAbsorptionRatio(assets, covarianceMatrix);
      setResults(absorptionRatio);
      setError('');
    } catch (err) {
      setError('An error occurred while analyzing the absorption ratio.');
      setResults(null);
    }
  };

  const handleDiversificationSubmit = async (event) => {
    event.preventDefault();
    try {
      const diversificationRatio = await analyzeDiversificationRatio(assets, covarianceMatrix, portfolios);
      setResults(diversificationRatio);
      setError('');
    } catch (err) {
      setError('An error occurred while analyzing the diversification ratio.');
      setResults(null);
    }
  };

  return (
    <div className="justify-center items-center bg-black min-h-screen">
      <div className="p-4 max-w-lg mx-auto bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Portfolio Analysis</h2>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('absorption')}
            className={`px-4 py-2 rounded ${activeTab === 'absorption' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
          >
            Absorption Ratio
          </button>
          <button
            onClick={() => setActiveTab('diversification')}
            className={`px-4 py-2 rounded ${activeTab === 'diversification' ? 'bg-blue-500' : 'bg-gray-600'} text-white`}
          >
            Diversification Ratio
          </button>
        </div>

        {activeTab === 'absorption' && (
          <form onSubmit={handleAbsorptionSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
              <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
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
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
              Analyze Absorption Ratio
            </button>
          </form>
        )}

        {activeTab === 'diversification' && (
          <form onSubmit={handleDiversificationSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Number of Assets</label>
              <input
                type="number"
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Covariance Matrix (JSON format)</label>
              <textarea
                value={covarianceMatrix}
                onChange={(e) => setCovarianceMatrix(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                rows={4}
                required
              />
            </div>
            <div>
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

        {results && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Results</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default PortfolioAnalysis;
