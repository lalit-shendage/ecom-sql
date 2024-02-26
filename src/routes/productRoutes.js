// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products/:categoryId', productController.getProductsByCategory);

router.get('/products/:productId', productController.getProductDetails);

router.get('/categories', productController.getCategories);

module.exports = router;
