const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');


dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = require('./src/db/connection');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

const authRoutes = require('./src/routes/authRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use(limiter);

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/', productRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
