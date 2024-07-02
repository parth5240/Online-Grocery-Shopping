const { generateOtp } = require('../services/otpService');
const { orders, latestOrder, orderHistory } = require('../models/orderModel');

const createOrder = (req, res) => {
  const order = req.body;
  order.otp = generateOtp(); // Assign OTP to order
  orders.push(order);
  latestOrder.order = order; // Ensure latestOrder is initialized
  io.emit('orderUpdate', latestOrder.order);
  res.status(201).send(order);
};

const getLatestOrder = (req, res) => {
  if (latestOrder.order && latestOrder.order.status !== 'Complete') {
    res.status(200).send(latestOrder.order);
  } else {
    res.status(404).send({ message: 'No orders found' });
  }
};

const updateOrderStatus = (req, res) => {
  const { status, otp } = req.body;
  if (latestOrder.order) {
    if (status === 'Complete' && otp !== latestOrder.order.otp) {
      return res.status(400).send({ message: 'Invalid OTP' });
    }
    latestOrder.order.status = status;
    io.emit('orderUpdate', latestOrder.order);
    if (status === 'Complete') {
      orderHistory.push(latestOrder.order);
      latestOrder.order = null;
    }
    res.status(200).send(latestOrder.order);
  } else {
    res.status(404).send({ message: 'No orders found to update' });
  }
};

const getOrderHistory = (req, res) => {
  res.status(200).send(orderHistory);
};

module.exports = {
  createOrder,
  getLatestOrder,
  updateOrderStatus,
  getOrderHistory,
};
