import React, { useState, useEffect } from 'react';

const TickerNews = () => {
  const [ticker, setTicker] = useState(''); // State to store the user input (tickers)
  const [articles, setArticles] = useState([]); // State to store news articles
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch general news when no ticker is provided
  const fetchGeneralNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=8PGDFL6JGOQEL6AI`);
      const result = await response.json();
      setArticles(result.feed); // Update with general news data
    } catch (err) {
      setError("Failed to fetch general news. Please try again.");
      console.error("Error fetching the general news:", err);
    }
    setLoading(false);
  };

  // Function to handle the API call for specific tickers
  const fetchTickerNews = async () => {
    setLoading(true);
    setError(null); // Reset errors
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=8PGDFL6JGOQEL6AI`);
      const result = await response.json();
      if (result) {
        setArticles(result); // Update articles with API response data
      } else {
        fetchGeneralNews(); // Fallback to general news if no articles found for the ticker
      }
    } catch (err) {
      setError("Failed to fetch news articles. Please try again.");
      console.error("Error fetching the articles:", err);
    }
    setLoading(false); // End loading
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (ticker) {
      fetchTickerNews(); // Fetch news if ticker is provided
    } else {
      fetchGeneralNews(); // Fetch general news if no ticker is provided
    }
  };

  // Fetch general news on component mount
  useEffect(() => {
    fetchGeneralNews();
  }, []);

  return (
    <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Search for Ticker Symbol News</h1>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="flex justify-center mb-8">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
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

      {/* Display the articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-400 mb-4">{article.summary}</p>
              {article.banner_image && (
                <img src={article.banner_image} alt={article.title} className="mb-4 rounded-lg" />
              )}
              <p className="mb-4">By: {article.authors.join(", ")}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No articles found. Displaying general news.</p>
        )}
      </div>
    </div>
  );
};

export default TickerNews;
