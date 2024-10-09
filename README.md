# OptiStock
OptiStock is a comprehensive tool designed to simplify and enhance the process of evaluating stock portfolios. The idea behind this full-stack application stems from the need to make informed financial decisions without the complexity that often accompanies stock analysis. By integrating with a stock portfolio optimizer API, OptiStock delivers real-time financial ratios and performance insights directly to the user.

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
Django was selected for the backend due to its powerful integration with data science and machine learning libraries within the Python ecosystem. The ability to work with tools like NumPy, Pandas, and scikit-learn allows for more advanced financial modeling and analysis, compared to other backend frameworks such as Laravel or Spring Boot. Django also provides a robust structure for handling API integrations, which is crucial for connecting with the portfolio optimizer API.

### API Integration
OptiStock's API integration connects with stock market data providers and optimization algorithms to fetch up-to-date stock data and perform complex financial calculations in the background. This allows users to receive data-driven recommendations and insights on their portfolios without manual input.

## Vision
The vision for OptiStock is to become a go-to solution for investors looking for automated, reliable, and comprehensive portfolio management. It aims to combine the latest advancements in data science and financial modeling with an intuitive user interface, making high-level financial analysis accessible to both experienced and novice investors alike.


## Things that I have picked up
With the increasing rate of devops being required for full stack software engineers, I've decided to pick up and do more of automated testing via CI/CD pipelines using circle ci and writing out the test cases for both frontend and backend to ensure that my application behaves as it should be without any unforeseen issues arising that might break it. 
