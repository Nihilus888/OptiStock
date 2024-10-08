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
          <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />
          {/* Protected route for authenticated users */}
          <Route path="/dashboard" element={<PrivateRoute element={<HomeAuth />} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
