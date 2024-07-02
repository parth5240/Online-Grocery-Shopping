// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        
        <li>
          <Link to="/handle-orders">Handle Orders</Link>
        </li>
        <li>
          <Link to="/completed-orders">Completed Orders</Link>
        </li>
        <li>
          <Link to="/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
