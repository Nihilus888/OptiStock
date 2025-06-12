import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'; // Home page for unauthenticated users
import HomeAuth from './components/HomeAuth'; // Home page for authenticated users
import CreateAccountForm from './components/CreateAccountForm'; // Form for creating a new account
import About from './components/About'; // About page
import Footer from './components/Footer'; // Footer component displayed on every page
import Login from './components/Login'; // Login page for users to sign in
import Contact from './components/Contact'; // Contact page
import { AuthProvider, useAuth } from './components/AuthContext'; // Context to manage authentication state
import PortfolioAnalysis from './components/PortfolioAnalysis'; // Portfolio analysis component for authenticated users
import Stats from './components/Stats'; // Stats page for authenticated users
import BalanceSheet from './components/BalanceSheet'; // Company balance sheet page
import IncomeStatement from './components/IncomeStatement'; // Income statement page
import TradingBot from './components/TradingBot'; // Trading bot page for authenticated users
import Loading from './components/Loading'; // Loading spinner for lazy-loaded components
import ErrorBoundary from './components/ErrorBoundary'; // Error boundary to catch and display errors in the app
import Error from './components/Error'; // Error page to display when there is an Error
import NotFound from './components/NotFound';

// Lazy load the News component to improve performance
const LazyNews = React.lazy(() => import('./components/News'));

// Lazy lod the Price components to improve performance
const LazyPrice = React.lazy(() => import('./components/Price'));

// PrivateRoute component ensures that only authenticated users can access protected routes
const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Use AuthContext to check if the user is authenticated
  return user ? element : <Navigate to="/login" />; // Redirect unauthenticated users to the login page
};

function App() {
  return (
    <AuthProvider> {/* Provide authentication context to the app */}
      <Router> {/* Set up the Router to handle URL routing */}
        <NavBar /> {/* Navigation bar displayed on all pages */}
        
        {/* Wrap the Routes inside an ErrorBoundary to catch any errors in the child components */}
        <ErrorBoundary fallback={<Error/>}>
          <Routes>
            {/* Routes for different pages */}
            <Route path="/home" element={<HomeAuth />} /> {/* Home page for authenticated users */}
            <Route path="/" element={<Home />} /> {/* Home page for unauthenticated users */}
            <Route path="/create-account" element={<CreateAccountForm />} /> {/* Account creation page */}
            <Route path="/about" element={<About />} /> {/* About page */}
            <Route path="/contact" element={<Contact />} /> {/* Contact page */}
            <Route path="/login" element={<Login />} /> {/* Login page for signing in */}
            <Route path="*" element={<NotFound />} />  {/* Not Found page for routes not in here}
            
            {/* Protected routes (only accessible by authenticated users) */}
            <Route path="/stats" element={<PrivateRoute element={<Stats />} />} /> {/* Stats page */}
            
            {/* Lazy-loaded News page with a fallback loading spinner */}
            <Route 
              path="/news" 
              element={
                <PrivateRoute element={
                  <React.Suspense fallback={<Loading />}>
                    <LazyNews /> {/* Lazy-load News component */}
                  </React.Suspense>
                } />
              }
            />
            
            {/* More protected routes */}
            <Route path="/portfolio-analysis" element={<PrivateRoute element={<PortfolioAnalysis />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<HomeAuth />} />} />
            {/* Lazy-loaded Price page with a fallback loading spinner */}
            <Route
              path="/price"
              element={
                <PrivateRoute element={
                  <React.Suspense fallback={<Loading />}>
                    <LazyPrice />
                  </React.Suspense>

                } />
              }
            />
            <Route path="/company-analysis"  element={<PrivateRoute element={<BalanceSheet />} />} />
            <Route path="/income-statement" element={<PrivateRoute element={<IncomeStatement />} />} />
            <Route path="/trading-bot" element={<PrivateRoute element={<TradingBot />} />} />
          </Routes>
        </ErrorBoundary>
        
        <Footer /> {/* Footer component displayed at the bottom of the page */}
      </Router>
    </AuthProvider>
  );
}

export default App;
