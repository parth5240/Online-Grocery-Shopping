import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import Notification from './Notification';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, calculateTotal, clearCart, addToOrderHistory } = useContext(CartContext);
  const [notification, setNotification] = useState('');
  const [address, setAddress] = useState('');

  const handleBuyNow = async () => {
    if (!address) {
      setNotification('Please enter your address.');
      return;
    }

    const order = {
      items: cart,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
      status: 'Accepted',
      address: address
    };

    try {
      await axios.post('http://localhost:5000/orders/create', order);
      clearCart();
      setNotification('Thank you for your purchase! Your order has been placed.');
      addToOrderHistory(order);
      setAddress(''); // Clear address after placing order
    } catch (error) {
      console.error('Error creating order:', error);
      setNotification('Failed to place order. Please try again.');
    }
  };

  const handleRemoveFromCart = (productId, productName) => {
    removeFromCart(productId);
    setNotification(`${productName} has been removed from your cart.`);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <div className="section cart">
      <h1>Your Cart</h1>
      <div className="product-row">
        {cart.map(({ product, quantity }) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateCartQuantity(product.id, -1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => updateCartQuantity(product.id, 1)}>+</button>
            </div>
            <button
              className="remove-from-cart-button"
              onClick={() => handleRemoveFromCart(product.id, product.name)}
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <div className="address-input">
          <label htmlFor="address">Delivery Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>
        <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
      </div>
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default Cart;
