// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

router.get('/products/:categoryId', productController.getProductsByCategory);

router.get('/products/:productId', productController.getProductDetails);

router.get('/categories', categoryController.getCategories);

module.exports = router;
