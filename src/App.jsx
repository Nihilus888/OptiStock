import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'; // If you want to keep this for unauthenticated users
import HomeAuth from './components/HomeAuth'; // Import the HomeAuth component
import CreateAccountForm from './components/CreateAccountForm';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Contact from './components/Contact';
import { AuthProvider, useAuth } from './components/AuthContext'; // Import AuthProvider
import PortfolioAnalysis from './components/PortfolioAnalysis';
import News from './components/News';
import Stats from './components/Stats';
import Price from './components/Price';
import BalanceSheet from './components/BalanceSheet';
import IncomeStatement from './components/IncomeStatement';
import TradingBot from './components/TradingBot'
import CheckOut from './components/Checkout';

// Create a PrivateRoute component to protect the authenticated route
const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Use the AuthContext to check if the user is authenticated
  return user ? element : <Login />; // Redirect to Login if not authenticated
};

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<HomeAuth />} /> {/* Home page for authenticated users */}
          <Route path="/" element={<Home />} /> {/* Optionally keep Home for unauthenticated users */}
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stats" element={<PrivateRoute element={<Stats />} />} />
          <Route path="/news" element={<PrivateRoute element={<News />} />} />
          <Route path="/portfolio-analysis" element={<PrivateRoute element={<PortfolioAnalysis />} />} />
          {/* Protected route for authenticated users */}
          <Route path="/dashboard" element={<PrivateRoute element={<HomeAuth />} />} />
          <Route path="/price" element={<PrivateRoute element={<Price />} />} />
          <Route path="/company-analysis"  element={<PrivateRoute element={<BalanceSheet />} />} />
          <Route path="/income-statement" element={<PrivateRoute element={<IncomeStatement />} /> } />
          <Route path="/trading-bot" element={<PrivateRoute element={<TradingBot />} /> } />
          <Route path="/checkout" element={<PrivateRoute element={<CheckOut />} /> } />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
