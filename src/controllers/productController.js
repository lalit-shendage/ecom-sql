// productController.js
const db = require('../db/connection');

exports.getCategories = (req, res) => {
    try {
        db.query('SELECT * FROM categories', (err, results) => {
            if (err) {
                throw err;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductsByCategory = (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        db.query('SELECT * FROM products WHERE category_id = ?', [categoryId], (err, results) => {
            if (err) {
                throw err;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductDetails = (req, res) => {
    try {
        const productId = req.params.productId;
        db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length === 0) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
