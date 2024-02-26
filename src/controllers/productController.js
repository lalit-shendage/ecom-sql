// productController.js
const db = require('../db/connection');

exports.getCategories = async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const [rows, fields] = await db.execute('SELECT * FROM products WHERE category_id = ?', [categoryId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const productId = req.params.productId;
        const [rows, fields] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
