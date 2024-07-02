const express = require('express');
const { getTodaySales, getAllOrders } = require('../controllers/adminController');

const router = express.Router();

router.get('/today-sales', getTodaySales);
router.get('/all-orders', getAllOrders);

module.exports = router;
