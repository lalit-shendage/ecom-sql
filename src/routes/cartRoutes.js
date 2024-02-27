// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/addToCart', authenticateToken, cartController.addToCart);

router.get('/view', authenticateToken, cartController.viewCart);

router.put('/update', authenticateToken, cartController.updateCart);

router.delete('/remove/:productId', authenticateToken, cartController.removeCartItem);

module.exports = router;
