import React, { useState, useEffect } from 'react';

export default function IncomeStatement() {
    const [ticker, setTicker] = useState('');
    const [submittedTicker, setSubmittedTicker] = useState("MSFT");
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchIncomeSheet = async (symbol) => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHAVANTAGE_API_TOKEN}`;
            const response = await fetch(url);
            const result = await response.json();
            if (result.annualReports) {
                setCompany(result.annualReports);
            } else {
                setError("API call limit reached. Please try again later.");
            }
        } catch (err) {
            setError(`Error fetching income statement because of rate limit issues.`);
            console.error("Error fetching data from API", err);
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ticker.trim()) {
            setSubmittedTicker(ticker);  // Update submitted ticker
            fetchIncomeSheet(ticker);
        }
    };

    useEffect(() => {
        fetchIncomeSheet();
    }, []);

    return (
        <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-5xl font-extrabold mb-6 text-center">Search for Company's Income Statement</h1>
            
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
            
            {error && <p className="text-red-500 text-center font-extrabold">{error}</p>}

            <div className="text-center mb-10 text-2xl font-extrabold">
                {"Ticker Name: "} {submittedTicker}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {company.length > 0 ? (
                    company.map((report, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold-mb-4">{`Fiscal Date Ending: ${report.fiscalDateEnding || 'N/A'}`}</h2>
                            <p>Reported Currency: {report.reportedCurrency || 'N/A'}</p>
                            <p>Gross Profit: {report.grossProfit || 'N/A'}</p>
                            <p>Total Revenue: {report.totalRevenue || 'N/A'}</p>
                            <p>Net Interest Income: {report.netInterestIncome || 'N/A'}</p>
                            <p>Selling General and Administrative: {report.sellingGeneralAndAdministrative || 'N/A'}</p>
                            <p>Operating Expenses: {report.operatingExpenses || 'N/A'}</p>
                            <p>Interest Expense: {report.interestExpense || 'N/A'}</p>
                            <p>Depreciation: {report.depreciation || 'N/A'}</p>
                            <p>EBITDA: {report.ebitda || 'N/A'}</p>
                            <p>EBIT: {report.ebit || 'N/A'}</p>                      
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                    </p>
                )}
            </div>
        </div>
    );
}
