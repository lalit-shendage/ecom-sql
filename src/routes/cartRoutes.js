// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add', authenticateToken, cartController.addToCart);

router.get('/view', authenticateToken, cartController.viewCart);

router.put('/update/:productId', authenticateToken, cartController.updateCartItem);

router.delete('/remove/:productId', authenticateToken, cartController.removeCartItem);

module.exports = router;
