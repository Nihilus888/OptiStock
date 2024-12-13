# OptiStock
OptiStock is an intuitive full-stack application designed to simplify and enhance the evaluation of stock portfolios, empowering users to make well-informed financial decisions without navigating through overly complex analysis. This comprehensive tool integrates with a stock portfolio optimizer API to deliver real-time financial ratios and performance insights directly to the user. Additionally, it incorporates data from other financial APIs, such as the Alpha Vantage API, which provides access to vital financial data, including cash flow statements and balance sheets.

During the development of OptiStock, I also explored creating a trading bot that makes buy or sell decisions by analyzing financial news sentiment using machine learning-based sentiment analysis. Inspired by this YouTube tutorial: "https://www.youtube.com/watch?v=c9OjEThuJjY", I built the foundational trading bot and algorithm. I extended its functionality by incorporating additional trading metrics, such as trading volume and other key financial parameters, while allowing the bot to dynamically accept and respond to user-defined settings.

With these integrations and customizations, OptiStock stands as both a portfolio optimization and trading analysis solution that leverages cutting-edge financial data and machine learning algorithms to support strategic investment decisions.

## Purpose
The primary goal of OptiStock is to automate and streamline portfolio evaluation, providing investors with key metrics such as risk-reward ratios, asset diversification recommendations, and real-time stock analytics. Instead of manually calculating financial ratios or relying on multiple tools, OptiStock centralizes the process, offering a one-stop platform for portfolio optimization.

## Key Features
Real-time Financial Ratios: Access critical financial ratios instantly, such as P/E ratio, ROI, Sharpe Ratio, and more, helping users make data-driven investment decisions.
Automated Portfolio Optimization: Utilizing advanced algorithms and historical market data, OptiStock provides portfolio recommendations tailored to an investor's risk appetite and financial goals.
Risk Management Tools: Features advanced risk assessment tools that help balance portfolio exposure, allowing users to optimize for both short-term gains and long-term stability.

## Tech Stack
### Frontend: React.js
OptiStock's frontend is built using React.js, chosen for its modular architecture and the availability of libraries that make development faster and more scalable. React’s component-based design enables the seamless integration of features like real-time analytics and dynamic data rendering, which are essential for the project.

### Backend: Django (Python)
Django was selected for the backend due to its powerful integration with data science and machine learning libraries within the Python ecosystem. The ability to work with tools like NumPy, Pandas, and scikit-learn allows for more advanced financial modeling and analysis, compared to other backend frameworks such as Laravel or Spring Boot. Django also provides a robust structure for handling API integrations, which is crucial for connecting with the portfolio optimizer API. Furthermore, it was a backend framework that I would like to pick up as it's versatility is increasing in the software engineering market place.

### API Integration
OptiStock's API integration connects with stock market data providers and optimization algorithms to fetch up-to-date stock data and perform complex financial calculations in the background. This allows users to receive data-driven recommendations and insights on their portfolios without manual input.

### Trading Bot
OptiStock's trading bot uses machine learning via sentiment analysis that analyzes financial news to see if it is positive, neutral and negative and makes a purchase as well with confluences of volume and other measures to make buying or selling decisions. 

## Vision
The vision for OptiStock is to become a go-to solution for investors looking for automated, reliable, and comprehensive portfolio management. It aims to combine the latest advancements in data science and financial modeling with an intuitive user interface, making high-level financial analysis accessible to both experienced and novice investors alike.


## Things that I have picked up
With the increasing rate of devops being required for full stack software engineers, I've decided to pick up and do more of automated testing via CI/CD pipelines using circle ci and writing out the test cases for both frontend and backend to ensure that my application behaves as it should be without any unforeseen issues arising that might break it. In addition, I had to learn Django from scratch but having knowledge in backend engineering and python, it was easier to pick it up after watching some youtube videos, reading the documentation and using chatgpt.
