import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import CartProvider from './contexts/CartContext.jsx';
import './App.css';
import LoginForm from './components/LoginModal.jsx';
import SignupForm from './components/SignupModal.jsx'; // Ensure this is the correct path
import TrackOrder from './components/TrackOrder';

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  const handleLogin = (userData) => {
    setUser(userData);
    closeLoginModal();
  };

  const handleSignup = (userData) => {
    setUser(userData);
    closeSignupModal();
    openLoginModal();
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <Navbar 
          openLoginModal={openLoginModal} 
          openSignupModal={openSignupModal} 
          user={user}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/track-order" element={<TrackOrder />} />
        </Routes>
        {isLoginOpen && (
          <LoginForm 
            closeModal={closeLoginModal} 
            openSignupModal={openSignupModal} 
            handleLogin={handleLogin} 
          />
        )}
        {isSignupOpen && (
          <SignupForm 
            closeModal={closeSignupModal} 
            openLoginModal={openLoginModal} 
            handleSignup={handleSignup} 
          />
        )}
      </Router>
    </CartProvider>
  );
};

export default App;
