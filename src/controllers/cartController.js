// cartController.js
const db = require('../db/connection');

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const [existingCartItem] = await db.execute('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);

        if (existingCartItem.length > 0) {
            await db.execute('UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
            res.json({ message: 'Quantity updated in the cart successfully' });
        } else {
            await db.execute('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
            res.json({ message: 'Product added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.viewCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const [cartItems] = await db.execute('SELECT * FROM cart WHERE user_id = ?', [userId]);
        res.json(cartItems);
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity, cartItemId } = req.body;

        const [existingCartItem] = await db.execute('SELECT * FROM cart WHERE id = ?', [cartItemId]);

        if (existingCartItem.length > 0) {
            await db.execute('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartItemId]);
            res.json({ message: 'Cart item quantity updated successfully' });
        } else {
            const { userId } = req.user;

            await db.execute('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
            res.json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error updating cart item or adding different item to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id; 
        await db.execute('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

