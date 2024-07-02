import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './TrackOrder.css';

const statuses = ['Accepted', 'Preparing', 'Out for Delivery', 'Payment', 'Complete'];

const TrackOrder = () => {
  const [latestOrder, setLatestOrder] = useState(null);
  const [otp, setOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders/latest');
        setLatestOrder(response.data);
      } catch (error) {
     
        console.error('Error fetching latest order:', error);
      }
    };

    fetchLatestOrder();

    const socket = io('http://localhost:5000');
    socket.on('orderUpdate', (order) => {
      setLatestOrder(order);
      if (order.status === 'Complete') {
        fetchLatestOrder();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getCurrentStep = () => {
    return statuses.indexOf(latestOrder?.status);
  };

  const handleOtpChange = (e) => {
    setInputOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/orders/update', {
        status: 'Complete',
        otp: inputOtp,
      });
      setLatestOrder(response.data);
      setError('');
    } catch (error) {
      setError('Error verifying OTP');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="section track-order">
      <h1>Track Your Latest Order</h1>
      {error && <p className="error">{error}</p>}
      {latestOrder ? (
        <div className="track-order-content">
          <div className="progress-bar">
            {statuses.map((status, index) => (
              <div key={index} className={`step ${getCurrentStep() >= index ? 'active' : ''}`}>
                <div className="step-icon">{index + 1}</div>
                <p className="step-text">{status}</p>
              </div>
            ))}
            <div className="progress-line" style={{ height: `${(getCurrentStep() / (statuses.length - 1)) * 100}%` }}></div>
          </div>
          <div className="order-details">
            <h3>Order placed on {latestOrder.date}</h3>
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
            <h3>Total: ${latestOrder.total.toFixed(2)}</h3>
            {latestOrder.status === 'Payment' && (
              <div className="otp-verification">
                <h3>Enter OTP to confirm completion:</h3>
                <input
                  type="text"
                  value={inputOtp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                />
                <button onClick={handleVerifyOtp}>Submit OTP</button>
                <p>OTP: {latestOrder.otp}</p> {/* Display the OTP */}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No orders to display.</p>
      )}
    </div>
  );
};

export default TrackOrder;
