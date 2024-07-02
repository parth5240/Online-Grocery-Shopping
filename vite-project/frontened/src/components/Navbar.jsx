import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Navbar = ({ user, handleLogout, handleLoginSuccess, handleSignupSuccess }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.jpg" alt="Logo" />
        <span className="site-name">Online Grocery Shopping</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/track-order">Track Order</Link>
        <Link to="/order-history">Order History</Link>
      </div>
      <div className="auth-buttons">
        {!user ? (
          <>
            <button className='button' onClick={openLoginModal}>Login</button>
            <button className='button' onClick={openSignupModal}>Sign Up</button>
          </>
        ) : (
          <div className="profile-section">
            <img
              src="/images/profile-icon.png"
              alt="Profile"
              className="profile-icon"
              onClick={toggleProfileDropdown}
            />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
      {showLoginModal && <LoginModal closeModal={closeLoginModal} handleLoginSuccess={handleLoginSuccess} />}
      {showSignupModal && <SignupModal closeModal={closeSignupModal} handleSignupSuccess={handleSignupSuccess} />}
    </nav>
  );
};

export default Navbar;
