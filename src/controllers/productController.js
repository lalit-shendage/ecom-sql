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

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const [existingCategories] = await db.execute('SELECT * FROM categories WHERE name = ?', [name]);
        if (existingCategories.length > 0) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        await db.execute('INSERT INTO categories (name) VALUES (?)', [name]);
        res.json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, availability, categoryId } = req.body;

        // Check if all required fields are provided
        if (!name || !price || !description || typeof availability === 'undefined' || !categoryId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the product already exists
        const [existingProducts] = await db.execute('SELECT * FROM products WHERE name = ?', [name]);
        if (existingProducts.length > 0) {
            return res.status(400).json({ error: 'Product already exists' });
        }

        // If all fields are provided and the product doesn't exist, proceed with creating it
        await db.execute('INSERT INTO products (name, price, description, availability, category_id) VALUES (?, ?, ?, ?, ?)', [name, price, description, availability, categoryId]);

        res.json({ message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};