import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Apple' },
    { id: 2, item: 'Banana' },
  ]);

  const [completedOrders, setCompletedOrders] = useState([]);

  const acceptOrder = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setCompletedOrders([...completedOrders, order]);
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const declineOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <OrderContext.Provider value={{ orders, completedOrders, acceptOrder, declineOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
