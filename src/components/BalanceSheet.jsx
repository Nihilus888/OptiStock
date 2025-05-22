import React, { useState, useEffect } from 'react';

export default function BalanceSheet() {
    const [ticker, setTicker] = useState('');
    const [submittedTicker, setSubmittedTicker] = useState('MSFT');
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBalanceSheet = async (symbol = 'MSFT') => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/balance-sheet/${symbol}/`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Server error: ${errorText}`);
                throw new Error(`Failed to fetch data: ${response.status}`);
            }
            const json = await response.json();
            const data = json.annualReports ?? json.data;
            if (data?.length) {
                setCompanyData(data);
            } else {
                setError("No balance sheet data found.");
            }
        } catch (err) {
            console.error(`Error fetching balance sheet for ${symbol}:`, err);
            setError(`Unable to fetch balance sheet for ${symbol}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const symbol = ticker.trim() || 'MSFT';
        setSubmittedTicker(symbol);
        fetchBalanceSheet(symbol);
    };

    useEffect(() => {
        fetchBalanceSheet();
    }, []);

    return (
        <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-center">
                Search for Company Balance Sheet
            </h1>

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

            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            )}

            {error && (
                <p className="text-red-500 text-center font-extrabold">{error}</p>
            )}

            <div className="text-center mb-10 text-2xl font-extrabold">
                Ticker Name: {submittedTicker}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyData.length > 0 ? (
                    companyData.map((report, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold mb-4">
                                Fiscal Date Ending: {report.fiscalDateEnding ?? 'N/A'}
                            </h2>
                            <p>Reported Currency: {report.reportedCurrency ?? 'N/A'}</p>
                            <p>Total Assets: {formatNumber(report.totalAssets)}</p>
                            <p>Total Liabilities: {formatNumber(report.totalLiabilities)}</p>
                            <p>Total Shareholder Equity: {formatNumber(report.totalShareholderEquity)}</p>
                            <p>Retained Earnings: {formatNumber(report.retainedEarnings)}</p>
                            <p>Common Stock Shares Outstanding: {formatNumber(report.commonStockSharesOutstanding)}</p>
                            <p>Goodwill: {formatNumber(report.goodwill)}</p>
                            <p>Intangible Assets: {formatNumber(report.intangibleAssets)}</p>
                            <p>Inventory: {formatNumber(report.inventory)}</p>
                            <p>Cash and Cash Equivalents: {formatNumber(report.cashAndCashEquivalentsAtCarryingValue)}</p>
                        </div>
                    ))
                ) : (
                    !loading && !error && (
                        <p className="text-center text-gray-400">No data available.</p>
                    )
                )}
            </div>
        </div>
    );
}

// Utility to format large numbers safely
function formatNumber(value) {
    return value ? parseInt(value).toLocaleString() : 'N/A';
}
