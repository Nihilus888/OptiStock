# OptiStock
OptiStock is an intuitive full-stack application designed to simplify and enhance stock portfolio evaluation, empowering users to make well-informed financial decisions without navigating overly complex analysis. This comprehensive tool integrates with a stock portfolio optimizer API to deliver real-time financial ratios and performance insights directly to users. Additionally, it incorporates data from other financial APIs, such as the Alpha Vantage API, providing access to vital financial data including cash flow statements and balance sheets.

During the development of OptiStock, I also explored creating a trading bot that makes buy or sell decisions by analyzing financial news sentiment using machine learning-based sentiment analysis. Inspired by this YouTube tutorial: "https://www.youtube.com/watch?v=c9OjEThuJjY", I built the foundational trading bot and algorithm. I extended its functionality by incorporating additional trading metrics, such as trading volume and other key financial parameters, while allowing the bot to dynamically accept and respond to user-defined settings.

With these integrations and customizations, OptiStock stands as both a portfolio optimization and trading analysis solution, leveraging cutting-edge financial data and machine learning algorithms to support strategic investment decisions.

## Purpose
The primary goal of OptiStock is to automate and streamline portfolio evaluation, providing investors with key metrics such as risk-reward ratios, asset diversification recommendations, and real-time stock analytics. Instead of manually calculating financial ratios or relying on multiple tools, OptiStock centralizes the process, offering a one-stop platform for portfolio optimization.

## Key Features
1. Real-time Financial Ratios: Access critical financial ratios instantly, such as P/E ratio, ROI, Sharpe ratio, and more, helping users make data-driven investment decisions.

2. Automated Portfolio Optimization: Utilizing advanced algorithms and historical market data, OptiStock provides portfolio recommendations tailored to an investor's risk appetite and financial goals.

3. Risk Management Tools: Features advanced risk assessment tools that help balance portfolio exposure, allowing users to optimize for both short-term gains and long-term stability.

## Tech Stack
### Frontend: React.js
OptiStock's frontend is built using React.js, chosen for its modular architecture and the availability of libraries that accelerate development and scalability. React’s component-based design enables the seamless integration of features like real-time analytics and dynamic data rendering, which are essential for the project.

I implemented lazy loading and a fallback for the news article section, which contains heavy text content that might take time to load, to improve user experience. Additionally, I used an Error Boundary to catch any errors and display a fallback UI to inform users instead of showing a blank white screen, which is detrimental to UI/UX.

To add more flair and smooth animations, I used Chart.js with React bindings to create engaging charts with nice animations.

### Backend: Django (Python)
Django was selected for the backend due to its powerful integration with data science and machine learning libraries in the Python ecosystem. The ability to work with tools like NumPy, Pandas, and scikit-learn allows for more advanced financial modeling and analysis compared to other backend frameworks such as Laravel or Spring Boot. Django also provides a robust structure for handling API integrations, which is crucial for connecting with the portfolio optimizer API. Furthermore, I wanted to learn Django as its versatility is increasing in the software engineering marketplace. To follow modern authentication industry standards, I decided to implement JWT over session-based authentication.

For the trading bot to work smoothly, I used Celery as a task management queue to handle asynchronous tasks. This resolved multithreading issues that occurred when Celery was not used.

### API Integration
OptiStock’s API integration connects with stock market data providers and optimization algorithms to fetch up-to-date stock data and perform complex financial calculations in the background. This allows users to receive data-driven recommendations and portfolio insights without manual input.

## Caching
As API rate limit calls happen frequently on some of our third-party API integrations, I have added a caching layer using Redis to store data that only updates after a few months like balance sheet so that we don't flood their server with request that might get us rate limited unnecessarily.

## Monitoring and Logging
To catch hidden issues early and ensure long-term stability, I integrated Sentry for real-time error monitoring, logging, and stack tracing. The setup was quick and straightforward, and Sentry immediately began capturing valuable insights into potential bugs and edge cases. Below are examples of issues it successfully logged.

<img width="1434" alt="Screenshot 2025-05-15 at 4 51 26 PM" src="https://github.com/user-attachments/assets/4f76cae5-d398-46c2-9da5-7c3ab4dfcf6b" />

### Trading Bot
OptiStock's trading bot uses machine learning via sentiment analysis that analyzes financial news to see if it is positive, neutral and negative and makes a purchase as well with confluences of volume and other measures to make buying or selling decisions. FinBert was used to analyse the financial news text and had three discrete decisions that it had which was positive, negative and neutral which will then allow it to make decisions based on probabilistic sentiments that then allows it to decide whether to buy or sell that equity.

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

5. Dashboard with financial ratios against S&P 500:
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
pip install -r requirements.txt
```

This should allow you to access all the necessary functions of the application.

## Other System Design considerations

As many applications start to get more and more users, we have to consider the impact of how scalable and resilient our applications are towards this ongoing increasing demand and traffic.

We can add a load balancer and potentially use a round 
robin method to balance out the load evenly among the various servers. This would help to alleviate DDOS attacks 
and also ensure that the servers 
are utilized evenly without one server taking too many requests or load. 

Another thing we need to think of when we start to scale even larger is database where we need to think of horizontal or vertical scaling. We can initially do a vertical scaling by adding more RAM and memory to handle requests and in the meantime, we do horizontal scaling by database sharding, normalization and indexing. This should improve performance on the backend when we get more and more users.
