const express = require('express');
const { createOrder, getLatestOrder, updateOrderStatus, getOrderHistory } = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createOrder);
router.get('/latest', getLatestOrder);
router.post('/update', updateOrderStatus);
router.get('/history', getOrderHistory);

module.exports = router;
