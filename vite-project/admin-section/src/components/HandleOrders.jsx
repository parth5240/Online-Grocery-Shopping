import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './AdminDashboard.css';

const HandleOrders = () => {
  const [latestOrder, setLatestOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchLatestOrder();
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('orderUpdate', (order) => {
      setLatestOrder(order);
      setStatus(order.status);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchLatestOrder = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/latest');
      setLatestOrder(response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching latest order:', error);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await axios.post('http://localhost:5000/orders/update', { status: newStatus });
      socket.emit('orderUpdate', { ...latestOrder, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="section admin-dashboard">
      <h1>Admin Dashboard</h1>
      {latestOrder ? (
        <div className="order-details">
          <h3>Order placed on {latestOrder.date}</h3>
          <p>Delivery Address: {latestOrder.address}</p>
          {latestOrder.items && latestOrder.items.length > 0 ? (
            <div className="product-row">
              {latestOrder.items.map(({ product, quantity }) => (
                <div key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price.toFixed(2)}</p>
                  <p>Quantity: {quantity}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items in this order.</p>
          )}
          <h3>Total: ${latestOrder.total.toFixed(2)}</h3>
          <div className="status-controls">
            <p>Current Status: {status}</p>
            <button onClick={() => handleUpdateStatus('Accepted')}>Accept</button>
            <button onClick={() => handleUpdateStatus('Preparing')}>Prepare</button>
            <button onClick={() => handleUpdateStatus('Out for Delivery')}>Out for Delivery</button>
            <button onClick={() => handleUpdateStatus('Payment')}>Payment</button>
            <button onClick={() => handleUpdateStatus('Complete')}>Complete</button>
          </div>
        </div>
      ) : (
        <p>No orders to display.</p>
      )}
    </div>
  );
};

export default HandleOrders;
