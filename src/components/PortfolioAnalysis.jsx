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
        <div className="flex space-x-4 mb-4">
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
              <h1 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Absorption Ratio (AR)</h1>
              <p className="block text-sm font-medium mb-1 text-white">The <strong>Absorption Ratio</strong> measures financial risk by showing how much of the total market variance is "absorbed" by a small number of key factors (or eigenvectors).</p>

              <h2 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Formula for Absorption Ratio:</h2>
              <div class="formula">
                  <p className="block text-sm font-medium mb-1 text-white"><strong>AR =</strong> &Sigma;<sub>i=1</sub><sup>N</sup> &sigma;<sup>2</sup><sub>E<sub>i</sub></sub> / &Sigma;<sub>i=1</sub><sup>n</sup> &sigma;<sup>2</sup><sub>E<sub>i</sub></sub></p>
              </div>

              <h2 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Explanation:</h2>
              <ul className="block text-sm font-medium mb-1 text-white">
                  <li><strong>Numerator:</strong> Total variance explained by the top <em>N</em> eigenvectors.</li>
                  <li><strong>Denominator:</strong> Total variance of all assets.</li>
              </ul>
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
            <h1 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Diversification Ratio (DR)</h1>
              <p className="block text-sm font-medium mb-1 text-white">The <strong>Diversification Ratio</strong> measures the effectiveness of a portfolio's diversification by comparing the total portfolio risk to the risk of its individual assets.</p>

              <h2 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Formula for Diversification Ratio:</h2>
              <div class="formula">
                  <p className="block text-sm font-medium mb-1 text-white"><strong>DR =</strong> &sigma;<sub>t</sub> <em>w</em> / <em>w</em><sup>t</sup> &Sigma; <em>w</em></p>
              </div>

              <h2 className="block text-sm font-medium mb-1 text-white underline decoration-white decoration-2">Explanation:</h2>
              <ul className="block text-sm font-medium mb-1 text-white">
                  <li><strong>Numerator:</strong> Portfolio's total risk (weighted by asset standard deviations).</li>
                  <li><strong>Denominator:</strong> Portfolio's risk weighted by the covariance matrix of assets.</li>
              </ul>
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
