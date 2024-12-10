import React, { useState } from 'react';
import { tradingBot } from './apiClient';

export default function TradingBot() {
    const [ticker, setTicker] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const cash_at_risk = 0.5;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!ticker || !startDate || !endDate) {
            alert("It will default to symbol SPY, start date at 2024-11-01 and end date at 2024-11-30");
        }
    
        try {
            const response = await tradingBot(ticker, startDate, endDate, cash_at_risk);
            console.log('response', response);
    
            // Remove `response.json()` because the response is already parsed
            console.log('result', response);
        } catch (err) {
            console.error("Error occurred while submitting the data", err);
        }
    };

    return (
        <div className="max-w-10xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-400">OptiStock Trading Bot</h1>
            <p className="text-2xl text-center mb-8 max-w-3xl mx-auto">
                OptiStock Trading Bot uses machine learning sentiment analysis and other algorithms to come up with a trading strategy
                that aims to generate positive returns that can beat the market.
            </p>

            <div className="flex justify-center items-center flex-col">
                <form className="flex flex-col space-y-4 w-full md:w-2/3 lg:w-1/2" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={ticker}
                            onChange={(e) => setTicker(e.target.value)}
                            placeholder="Enter ticker symbols (e.g. TSLA, AMZN, MSFT)"
                            className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Enter start date (e.g. 2024-11-01)"
                            className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Enter end date (e.g. 2024-12-01)"
                            className="w-full p-4 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Center the button */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            Activate Trading Bot
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
