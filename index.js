const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = require('./src/db/connection');



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
