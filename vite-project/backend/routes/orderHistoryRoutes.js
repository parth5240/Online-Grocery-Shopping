const express = require('express');
const { getOrderHistory } = require('../controllers/orderHistoryController');

const router = express.Router();

router.get('/history', getOrderHistory);

module.exports = router;
