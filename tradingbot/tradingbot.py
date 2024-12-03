from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime 
from alpaca_trade_api import REST 
from timedelta import Timedelta 
from alpaca_trade_api.rest import REST, TimeFrame
from tradingbot.finbert_utils import estimate_sentiment
import os

API_KEY = os.getenv("API_KEY_PAPER")
API_SECRET = os.getenv("API_SECRET_PAPER")
BASE_URL = os.getenv("BASE_URL_PAPER")

ALPACA_CREDS = {
        "API_KEY": API_KEY,
        "API_SECRET": API_SECRET,
        "PAPER": True,
    }

alpaca = REST(API_KEY, API_SECRET, base_url=BASE_URL)

class MLTrader(Strategy): 

    API_KEY = os.getenv("API_KEY_PAPER")
    API_SECRET = os.getenv("API_SECRET_PAPER")
    BASE_URL = os.getenv("BASE_URL_PAPER")

    ALPACA_CREDS = {
        "API_KEY": API_KEY,
        "API_SECRET": API_SECRET,
        "PAPER": True,
    }

    alpaca = REST(API_KEY, API_SECRET, base_url=BASE_URL)

    def initialize(self, symbol: str = "SPY", cash_at_risk: float = 0.5, start_date: str = '2023-11-01', end_date: str = '2023-12-31'): 
        self.symbol = symbol
        self.sleeptime = "24H" 
        self.last_trade = None 
        self.cash_at_risk = cash_at_risk
        self.start_date = start_date
        self.end_date = end_date
        self.api = REST(base_url=BASE_URL, key_id=API_KEY, secret_key=API_SECRET)

    def position_sizing(self): 
        cash = self.get_cash() 
        last_price = self.get_last_price(self.symbol)
        quantity = round(cash * self.cash_at_risk / last_price, 0)
        return cash, last_price, quantity

    def get_volume(self):
        symbol = self.symbol
        timeframe = TimeFrame.Day
        try:
            bars = alpaca.get_bars(symbol, timeframe, start=self.start_date, end=self.end_date)
            if not bars:
                print(f"No data returned for {symbol} between {self.start_date} and {self.end_date}.")
                return 0
            max_volume = max(bar.v for bar in bars)
        except Exception as e:
            print("Error connecting to Alpaca API:", e)
            return 0

        return max_volume

    def get_dates(self): 
        today = self.get_datetime()
        three_days_prior = today - Timedelta(days=3)
        return today.strftime('%Y-%m-%d'), three_days_prior.strftime('%Y-%m-%d')

    def get_sentiment(self):
        today, three_days_prior = self.get_dates()
        news = self.api.get_news(symbol=self.symbol, start=three_days_prior, end=today)
        news = [ev.__dict__["_raw"]['headline'] for ev in news]
        probability, sentiment = estimate_sentiment(news)
        return probability, sentiment

    def on_trading_iteration(self):
        cash, last_price, quantity = self.position_sizing()
        probability, sentiment = self.get_sentiment()
        volume = self.get_volume()

        if cash > last_price:
            if sentiment == "positive" and probability > 0.999 and volume > 10000000:
                if self.last_trade == "sell":
                    self.sell_all()
                order = self.create_order(
                    self.symbol,
                    quantity, 
                    "buy",
                    type="market",
                    take_profit_price=last_price * 1.20,
                    stop_loss_price=last_price * 0.95
                )
                self.submit_order(order)
                self.last_trade = "buy"
            elif sentiment == "negative" and probability > 0.999 and volume > 10000000:
                if self.last_trade == "buy":
                    self.sell_all()
                order = self.create_order(
                    self.symbol,
                    quantity, 
                    "sell",
                    type="market",
                    take_profit_price=last_price * 0.8,
                    stop_loss_price=last_price * 1.05
                )
                self.submit_order(order)
                self.last_trade = "sell"

# Initialize start and end dates dynamically
start_date = datetime(2023, 11, 1)
end_date = datetime(2023, 12, 31) 

broker = Alpaca(ALPACA_CREDS)

# Initialize strategy with dynamic symbol and dates
strategy = MLTrader(
    name='mlstrat', 
    broker=broker, 
    parameters={
        "symbol": "SPY", 
        "cash_at_risk": 0.5,
        "start_date": start_date.strftime('%Y-%m-%d'),
        "end_date": end_date.strftime('%Y-%m-%d')
    }
)

# Run the backtest with dynamic parameters
strategy.backtest(
    YahooDataBacktesting, 
    start_date, 
    end_date, 
    parameters={
        "symbol": "SPY", 
        "cash_at_risk": 0.5
    }
)

### Run this only when we are not backtesting
# trader = Trader()
# trader.add_strategy(strategy)
# trader.run_all()