import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [ticker, setTicker] = useState('TSLA,AMZN,MSFT'); // Default tickers
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch stock intraday stats based on the ticker symbols
  const fetchStockStats = async () => {
    setLoading(true);
    setError(null); // Reset errors
    try {
      const response = await fetch(`https://api.marketaux.com/v1/entity/stats/intraday?symbols=${ticker}&interval=day&published_after=2024-10-09T09:43&language=en&api_token=${process.env.API_TOKEN}`);
      const result = await response.json();
      if (result.data && result.data.length > 0) {
        setStockData(result.data); // Set the stock data entries
      } else {
        setError("No data found for the provided ticker symbols.");
      }
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
      console.error("Error fetching stock data:", err);
    }
    setLoading(false);
  };

  // Fetch stock stats when the component mounts or when the ticker changes
  useEffect(() => {
    fetchStockStats();
  }, [ticker]);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockStats(); // Fetch stock data based on current ticker state
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
          placeholder="Enter ticker symbols (e.g. TSLA, AMZN, MSFT)"
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
      {stockData.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          {stockData.map(dateEntry => (
            <div key={dateEntry.date} className="mb-4">
              <h3 className="text-lg font-semibold">{new Date(dateEntry.date).toLocaleDateString()}</h3>
              {dateEntry.data.map(stock => (
                <div key={stock.key} className="mb-2">
                  <h2 className="text-xl font-bold">{stock.key}</h2>
                  <p><strong>Total Documents:</strong> {stock.total_documents}</p>
                  <p><strong>Average Sentiment:</strong> {stock.sentiment_avg.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stats;
