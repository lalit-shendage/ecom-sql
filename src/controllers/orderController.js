const db = require('../db/connection');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;

        let totalPrice = 0;
        for (const product of products) {
            const productDetails = await db.query('SELECT price FROM products WHERE id = ?', [product.productId]);
            const productPrice = parseFloat(productDetails[0][0].price);
            // console.log(productDetails[0][0].price)
            totalPrice += productPrice * product.quantity;
        }

        await db.query('START TRANSACTION');

        const orderResult = await db.query('INSERT INTO orders (user_id, total_price) VALUES (?, ?)', [userId, totalPrice]);
        const orderId = orderResult[0].insertId;

        for (const product of products) {
            await db.query('INSERT INTO order_details (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, product.productId, product.quantity]);
        }

        await db.query('COMMIT');

        res.json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);

        res.json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const orderDetails = await db.query('SELECT * FROM order_details WHERE order_id = ?', [orderId]);

        res.json(orderDetails[0]);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = exports;
