import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Price() {
    const [ticker, setTicker] = useState('');
    const [prices, setPrices] = useState([]);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);

    const fetchPrice = async () => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_TOKEN}`);
            const result = await response.json();
            const timeSeries = result['Time Series (Daily)'];
            setPrices(timeSeries);
            setError(null);
        } catch (err) {
            setError('Error when trying to query prices');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrice();
    };

    useEffect(() => {
        if (prices) {
            const dates = [];
            const closePrices = [];
            const volumes = [];
            
            Object.keys(prices).forEach(date => {
                dates.push(date);
                closePrices.push(parseFloat(prices[date]["4. close"]));
                volumes.push(parseInt(prices[date]["5. volume"]));
            });

            // Calculate a simple moving average
            const movingAverage = (data, period) => {
                const ma = data.map((value, index, arr) => {
                    if (index < period - 1) return null; 
                    const sum = arr.slice(index - period + 1, index + 1).reduce((a, b) => a + b, 0);
                    return sum / period;
                });

                // Fill the initial values with the first available MA value
                for (let i = 0; i < period - 1; i++) {
                    if (i < ma.length) {
                        ma[i] = ma[period - 1]; // Fill with the first valid MA value
                    }
                }
                return ma;
            };

            const ma50 = movingAverage(closePrices, 50);
            const ma100 = movingAverage(closePrices, 100);
            const ma20 = movingAverage(closePrices, 20);

            setChartData({
                labels: dates.reverse(),
                datasets: [
                    {
                        label: 'Close Price',
                        data: closePrices.reverse(),
                        borderColor: 'blue',
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: '20-day MA',
                        data: ma20.reverse(),
                        borderColor: 'green',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: '50-day MA',
                        data: ma50.reverse(),
                        borderColor: 'orange',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: '100-day MA',
                        data: ma100.reverse(),
                        borderColor: 'red',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    },
                    {
                        label: 'Volume',
                        data: volumes.reverse(),
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        type: 'bar',
                        yAxisID: 'volume-axis'
                    }
                ]
            });
        }
    }, [prices]);

    return (
        <div className="bg-black min-h-screen text-white">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Search for Ticker Symbol Price</h1>
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
                    Submit
                </button>
            </form>

            <div className="mt-8 px-4">
                {error && <p className="text-red-500">{error}</p>}
                {chartData && (
                    <div>
                        <Line 
                            data={chartData}
                            options={{
                                scales: {
                                    'y-axis': { 
                                        type: 'linear',
                                        position: 'left',
                                        ticks: { color: 'white' }
                                    },
                                    'volume-axis': {
                                        type: 'linear',
                                        position: 'right',
                                        ticks: { color: 'white' }
                                    },
                                    x: {
                                        ticks: { color: 'white' }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: { color: 'white' }
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Price;
