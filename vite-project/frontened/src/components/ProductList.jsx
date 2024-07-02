import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import Notification from './Notification';
import './ProductList.css';

const ProductList = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState('');

 

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} has been added to your cart.`);
  };

  const handleCloseNotification = () => {
    setNotification('');
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          <button className='add-to-cart-button ' onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}
    </div>
  );
};

export default ProductList;
