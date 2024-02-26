const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/place', authenticateToken, orderController.placeOrder);

router.get('/history', authenticateToken, orderController.getOrderHistory);

router.get('/:orderId', authenticateToken, orderController.getOrderDetails);

module.exports = router;
