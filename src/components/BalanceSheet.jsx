import React, { useState, useEffect } from 'react';

export default function BalanceSheet() {
    const [ticker, setTicker] = useState('');
    const [submittedTicker, setSubmittedTicker] = useState('MSFT'); // Stores the submitted ticker
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGeneralCompany = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=MSFT&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_TOKEN}`
            const response = await fetch(url);
            const result = await response.json();
            if (result.annualReports) {
                setCompany(result.annualReports || []);
            } else {
                setError("API call limit reached. Please try again later.");
            }
        } catch (err) {
            setError("Error fetching balance sheet.");
            console.error("Error fetching company balance sheets", err);
        }
        setLoading(false);
    };

    const fetchCompanyBalanceSheet = async (symbol) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_TOKEN}`
            );
            const result = await response.json();
            if (result.annualReports) {
                setCompany(result.annualReports);
            } else {
                fetchGeneralCompany();
            }
        } catch (err) {
            setError(`Error fetching ${symbol}'s balance sheet`);
            console.error(`Error fetching ${symbol}'s balance sheet`, err);
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ticker.trim()) {
            setSubmittedTicker(ticker);  // Update the displayed ticker only on submit
            fetchCompanyBalanceSheet(ticker);
        } else {
            setSubmittedTicker("MSFT");  // Default to MSFT when no ticker is entered
            fetchGeneralCompany();
        }
    };

    useEffect(() => {
        fetchGeneralCompany();
    }, []);

    return (
        <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Search for Company Balance Sheet</h1>

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
            {error && <p className="text-red-500 text-center font-extrabold">{error}</p>}

            {/* Display the last submitted ticker (not while typing) */}
            <div className="text-center mb-10 text-2xl font-extrabold">
                {"Ticker Name: "} {submittedTicker}
            </div>

            {/* Display the company balance sheet data */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {company.length > 0 ? (
                    company.map((report, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">{`Fiscal Date Ending: ${report.fiscalDateEnding || 'N/A'}`}</h2>
                            <p>Reported Currency: {report.reportedCurrency || 'N/A'}</p>
                            <p>Total Assets: {report.totalAssets ? parseInt(report.totalAssets).toLocaleString() : 'N/A'}</p>
                            <p>Total Liabilities: {report.totalLiabilities ? parseInt(report.totalLiabilities).toLocaleString() : 'N/A'}</p>
                            <p>Total Shareholder Equity: {report.totalShareholderEquity ? parseInt(report.totalShareholderEquity).toLocaleString() : 'N/A'}</p>
                            <p>Retained Earnings: {report.retainedEarnings ? parseInt(report.retainedEarnings).toLocaleString() : 'N/A'}</p>
                            <p>Common Stock Shares Outstanding: {report.commonStockSharesOutstanding ? parseInt(report.commonStockSharesOutstanding).toLocaleString() : 'N/A'}</p>
                            <p>Goodwill: {report.goodwill ? parseInt(report.goodwill).toLocaleString() : 'N/A'}</p>
                            <p>Intangible Assets: {report.intangibleAssets ? parseInt(report.intangibleAssets).toLocaleString() : 'N/A'}</p>
                            <p>Inventory: {report.inventory ? parseInt(report.inventory).toLocaleString() : 'N/A'}</p>
                            <p>Cash and Cash Equivalents: {report.cashAndCashEquivalentsAtCarryingValue ? parseInt(report.cashAndCashEquivalentsAtCarryingValue).toLocaleString() : 'N/A'}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 flex justify-center items-center">
                    </p>
                )}
            </div>
        </div>
    );
}
