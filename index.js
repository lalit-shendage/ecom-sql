const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = require('./src/db/connection');

// Routes
const authRoutes = require('./routes/authRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes');

app.use('/auth', authRoutes);
// app.use('/cart', cartRoutes);
// app.use('/order', orderRoutes);
// app.use('/', productRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
