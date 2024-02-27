// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/category/:categoryId',authenticateToken, productController.getProductsByCategory);

router.get('/products/:productId',authenticateToken, productController.getProductDetails);

router.get('/categories',authenticateToken, productController.getCategories);

router.post('/categories',authenticateToken, productController.createCategory);

router.post('/products',authenticateToken, productController.createProduct);

module.exports = router;
