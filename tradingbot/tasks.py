from celery import shared_task
from .tradingbot import MLTrader, Alpaca
from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
import os

@shared_task
def run_trading_bot(symbol, start_date, end_date, cash_at_risk):
    try:
        # Initialize Alpaca API client
        API_KEY = os.getenv("API_KEY_PAPER")
        API_SECRET = os.getenv("API_SECRET_PAPER")
        BASE_URL = os.getenv("BASE_URL_PAPER")

        alpaca = Alpaca({
            "API_KEY": API_KEY,
            "API_SECRET": API_SECRET,
            "PAPER": True,
        })

        # Initialize strategy
        strategy = MLTrader(
            name='mlstrat',
            broker=alpaca,
            parameters={
                "symbol": symbol,
                "cash_at_risk": cash_at_risk,
                "start_date": start_date.strftime('%Y-%m-%d'),
                "end_date": end_date.strftime('%Y-%m-%d')
            }
        )

        # Run backtest
        strategy.backtest(
            YahooDataBacktesting,
            start_date,
            end_date,
            parameters={
                "symbol": symbol,
                "cash_at_risk": cash_at_risk
            }
        )

        return {'status': 'success', 'message': 'Strategy backtest completed successfully.'}
    
    except Exception as e:
        return {'status': 'failure', 'error': str(e)}