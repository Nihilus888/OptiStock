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
Django was selected for the backend due to its powerful integration with data science and machine learning libraries within the Python ecosystem. The ability to work with tools like NumPy, Pandas, and scikit-learn allows for more advanced financial modeling and analysis, compared to other backend frameworks such as Laravel or Spring Boot. Django also provides a robust structure for handling API integrations, which is crucial for connecting with the portfolio optimizer API. Furthermore, it was a backend framework that I would like to pick up as it's versatility is increasing in the software engineering market place. To ensure that I'm following modern authentication industry standards, I decided to go with JWT which I chose over the session authentication method.

### API Integration
OptiStock's API integration connects with stock market data providers and optimization algorithms to fetch up-to-date stock data and perform complex financial calculations in the background. This allows users to receive data-driven recommendations and insights on their portfolios without manual input.

### Trading Bot
OptiStock's trading bot uses machine learning via sentiment analysis that analyzes financial news to see if it is positive, neutral and negative and makes a purchase as well with confluences of volume and other measures to make buying or selling decisions. 

## Vision
The vision for OptiStock is to become a go-to solution for investors looking for automated, reliable, and comprehensive portfolio management. It aims to combine the latest advancements in data science and financial modeling with an intuitive user interface, making high-level financial analysis accessible to both experienced and novice investors alike.

## Things that I have picked up
With the increasing rate of devops being required for full stack software engineers, I've decided to pick up and do more of automated testing via CI/CD pipelines using circle ci and writing out the test cases for both frontend and backend to ensure that my application behaves as it should be without any unforeseen issues arising that might break it. In addition, I had to learn Django from scratch but having knowledge in backend engineering and python, it was easier to pick it up after watching some youtube videos, reading the documentation and using chatgpt.

## Images of the application

1. Home page:
  <img width="1436" alt="Screenshot 2024-12-13 at 6 01 16 PM" src="https://github.com/user-attachments/assets/dac24152-619d-4480-9294-17ce2cd9e76f" />

2. Description of the application's usage:
   <img width="1436" alt="Screenshot 2024-12-13 at 6 04 30 PM" src="https://github.com/user-attachments/assets/b997a233-49e2-447c-bf11-5dd7ccae69c1" />

3. Financial News:
  <img width="1434" alt="Screenshot 2024-12-13 at 6 04 52 PM" src="https://github.com/user-attachments/assets/c9989f19-e19d-4dc9-a367-3e563e736108" />

4. Graph of performance against S&P 500:
  <img width="1436" alt="Screenshot 2024-12-13 at 6 10 24 PM" src="https://github.com/user-attachments/assets/f491e971-07b7-4d37-ae07-887ea13ed0da" />

5. Dashboard with financial rations against S&P 500:
  <img width="1434" alt="Screenshot 2024-12-13 at 6 10 38 PM" src="https://github.com/user-attachments/assets/65fdacc4-f14a-476c-9ed4-90709a91bc17" />


## How to use

As server fees are high with AWS, Heroku, Vercel or Azure, it is not really an option to deploy on these servers unless really necessary and people are using it. If you would like to use this, you can git clone the repository and run these commands for the frontend:

```
npm start
```

and for the backend:

```
python manage.py runserver
```

Furthermore, please install the different packages using 

```
npm install
```

and

```
install -r requirements.txt
```

This should allow you to access all the necessary functions of the application.

## System Design considerations

As many applications start to get more and more users, we have to consider the impact of how scalable and resilient our applications are towards this ongoing increasing demand and traffic.

There are certain improvements that I would have made in the future in 
the future including having a cache using Redis to store certain data 
so we can prevent requests from hitting the database unnecessarily.

There are various data that we can store in a cache and also prevent 
the data from being stale. As balance sheet and income statements only 
updates once after a few months due to companies only release earnings 
4 times a year, we could call on the cached data instead of calling 
the APIs or database directly that might lead to rate limiting issues.

During that period, we could wait for webhooks to update our cache 
data when there is an update of balance and income sheets. This is one of the most optimal ways to update data and store data without hitting rate limiting issues or cause our database to have too many request.

Second, we can add a load balancer and potentially use a round robin method to balance out the load evenly among the various servers. This would help to alleviate DDOS attacks and also ensure that the servers are utilized evenly without one server taking too many requests or load. 