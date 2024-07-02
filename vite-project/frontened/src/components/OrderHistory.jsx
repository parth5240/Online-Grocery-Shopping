import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders/history');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();

    const socket = io('http://localhost:5000');
    socket.on('orderUpdate', (order) => {
      if (order.status === 'Complete') {
        fetchOrderHistory();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="section order-history">
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <div className="order-history-content">
          {orders
            .slice()
            .reverse()
            .map((order, index) => (
              <div key={index} className="order-item">
                <h3>Order Delivered on {order.date}</h3>
                <div className="product-row">
                  {order.items.map(({ product, quantity }) => (
                    <div key={product.id} className="product-item">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p>${product.price.toFixed(2)}</p>
                      <p>Quantity: {quantity}</p>
                    </div>
                  ))}
                </div>
                <h3>Total: ${order.total.toFixed(2)}</h3>
                <p>Status: {order.status}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>No order history to display.</p>
      )}
    </div>
  );
};

export default OrderHistory;
