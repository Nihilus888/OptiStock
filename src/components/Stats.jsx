import React, { useState } from 'react';

const Stats = () => {
  const [ticker, setTicker] = useState(''); // Ticker input state
  const [stockData, setStockData] = useState(null); // Stock data state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch stock intraday stats based on the ticker symbols
  const fetchStockStats = async () => {
    if (!ticker) return; // Prevent API call if no ticker is set

    setLoading(true);
    setError(null); // Reset errors
    setStockData(null); // Reset stock data before new fetch
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=8PGDFL6JGOQEL6AI`
      );
      const result = await response.json();

      if (result.Information) {
        setError("API call limit reached. Please try again later.");
      } else if (result.Symbol) {
        setStockData(result); // Update stock data if the response is valid
      } else {
        setError("No data found for the provided ticker symbol.");
      }
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
      console.error("Error fetching stock data:", err);
    }
    setLoading(false);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockStats(); // Fetch stock data based on the current ticker
  };

  return (
    <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Stock Intraday Statistics</h1>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex justify-center mb-8">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())} // Ensure the ticker is uppercase
          placeholder="Enter ticker symbol (e.g. TSLA, AMZN, MSFT)"
          className="w-full md:w-2/3 lg:w-1/2 p-3 rounded-l-md border border-gray-600 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-r-md transition-all"
        >
          Search
        </button>
      </form>

      {/* Show loading state */}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {/* Show error if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display the stock stats */}
      {stockData && (
        <div>
          <div className="text-center text-white text-xl mb-4">Symbol: {stockData.Symbol}</div>
          <div className="text-center text-white text-xl mb-4">Asset Type: {stockData.AssetType}</div>
          <div className="text-center text-white text-xl mb-4">Name: {stockData.Name}</div>
          <div className="text-center text-white text-xl mb-4">EBITDA: {stockData.EBITDA}</div>
          <div className="text-center text-white text-xl mb-4">PEGRatio: {stockData.PEGRatio}</div>
          <div className="text-center text-white text-xl mb-4">Book Value: {stockData.BookValue}</div>
          <div className="text-center text-white text-xl mb-4">Dividend Per Share: {stockData.DividendPerShare}</div>
          <div className="text-center text-white text-xl mb-4">Return On Asset: {stockData.ReturnOnAssetsTTM}</div>
          <div className="text-center text-white text-xl mb-4">Return On Equity: {stockData.ReturnOnEquityTTM}</div>
          <div className="text-center text-white text-xl mb-4">Analyst Target Price: {stockData.AnalystTargetPrice}</div>
        </div>
      )}

      {/* Show message when no stock data is available */}
      {!loading && !error && !stockData && (
        <p className="text-center text-gray-400">Enter a ticker symbol to view stock data.</p>
      )}
    </div>
  );
};

export default Stats;
