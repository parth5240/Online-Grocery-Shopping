import React, { createContext, useState } from 'react';

// Create the context
export const OrderHistoryContext = createContext();

// Create the provider component
export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  // Add an order to the history
  const addOrder = (order) => {
    setOrderHistory((prevHistory) => [...prevHistory, order]);
  };

  return (
    <OrderHistoryContext.Provider value={{ orderHistory, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
