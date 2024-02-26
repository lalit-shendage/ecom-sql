// cartController.js
const db = require('../db/connection');

exports.addToCart = (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity], (err, results) => {
            if (err) {
                console.error('Error adding product to cart:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'Product added to cart successfully' });
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewCart = (req, res) => {
    try {
        const userId = req.user.id; 
        db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                console.error('Error viewing cart:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCartItem = (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        db.query('UPDATE cart SET quantity = ? WHERE product_id = ?', [quantity, productId], (err, results) => {
            if (err) {
                console.error('Error updating cart item:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'Cart item updated successfully' });
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.removeCartItem = (req, res) => {
    try {
        const { productId } = req.params;
        db.query('DELETE FROM cart WHERE product_id = ?', [productId], (err, results) => {
            if (err) {
                console.error('Error removing cart item:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'Cart item removed successfully' });
        });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
