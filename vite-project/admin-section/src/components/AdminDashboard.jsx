// src/components/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import OrderHistory from './OrderHistory';
import CompletedOrders from './CompletedOrders';
import HandleOrders from './HandleOrders';
import Login from './Login';


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />
      <Routes>
        <Route path="handle-orders" element={<HandleOrders />} />
        <Route path="completed-orders" element={<CompletedOrders />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="login" element={<Login />} />
       
        <Route path="/" element={<Navigate to="dashboard" />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
