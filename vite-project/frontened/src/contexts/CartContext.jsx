import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  useEffect(() => {
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantityChange) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
          : item
      );
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToOrderHistory = (order) => {
    setOrderHistory((prevOrderHistory) => [order, ...prevOrderHistory]);
    setTrackingOrder(order);
  };

  return (
    <CartContext.Provider value={{
      cart,
      orderHistory,
      trackingOrder,
      setTrackingOrder,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      calculateTotal,
      clearCart,
      addToOrderHistory,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
