import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTable } from 'react-table';

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

  // Prepare data for the charts (excluding EBITDA)
  const chartData = {
    labels: [
      'PEGRatio',
      'Book Value',
      'Dividend Per Share',
      'Return On Assets',
      'Return On Equity',
      'Analyst Target Price',
    ],
    datasets: [
      {
        label: ticker || 'Stock Data', // Use the ticker or a default label
        data: [
          parseFloat(stockData?.PEGRatio || 0),
          parseFloat(stockData?.BookValue || 0),
          parseFloat(stockData?.DividendPerShare || 0),
          parseFloat(stockData?.ReturnOnAssetsTTM || 0),
          parseFloat(stockData?.ReturnOnEquityTTM || 0),
          parseFloat(stockData?.AnalystTargetPrice || 0),
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Prepare data for the pivot table (excluding EBITDA)
  const dataForTable = React.useMemo(
    () => [
      {
        metric: 'PEGRatio',
        value: parseFloat(stockData?.PEGRatio || 0),
      },
      {
        metric: 'Book Value',
        value: parseFloat(stockData?.BookValue || 0),
      },
      {
        metric: 'Dividend Per Share',
        value: parseFloat(stockData?.DividendPerShare || 0),
      },
      {
        metric: 'Return On Assets',
        value: parseFloat(stockData?.ReturnOnAssetsTTM || 0),
      },
      {
        metric: 'Return On Equity',
        value: parseFloat(stockData?.ReturnOnEquityTTM || 0),
      },
      {
        metric: 'Analyst Target Price',
        value: parseFloat(stockData?.AnalystTargetPrice || 0),
      },
    ],
    [stockData]
  );

  // Columns for the pivot table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Metric',
        accessor: 'metric', // accessor is the "key" in the data
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: dataForTable,
  });

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

          {/* Chart for stock data */}
          <div className="mt-8">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          {/* Pivot Table */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Stock Data Pivot Table</h2>
            <table {...getTableProps()} className="w-full border-collapse border border-gray-600">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} className="border border-gray-600 p-2 bg-gray-800">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border border-gray-600">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="border border-gray-600 p-2 text-center">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
