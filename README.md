# E-commerce Application

This is an e-commerce application that allows users to browse products, add them to their cart, and place orders. The application is built using Node.js, Express.js, and MySQL.

## Features

- User authentication: Users can sign up, log in, and log out.
- Product management: Admin users can add, edit, and delete products.
- Shopping cart: Users can add products to their cart, update quantities, and remove items.
- Order placement: Users can place orders for the items in their cart.
- Order history: Users can view their past orders.
- API endpoints for interaction with the frontend.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lalit-shendage/ecom-sql


2. Install dependencies

    ```bash
    cd ecommerce-app
    npm install

3. Set up the database 

    a. Create a MySQL database named ecommerce.

    b. Import the provided SQL file (ecomData.sql) to create the necessary tables and sample data.

4. Configure environment variables:

    a. Create a .env file in the root directory.

    b. Define the following environment variables in the .env file:

     ```bash
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_database_password
        DB_NAME=ecommerce
        JWT_SECRET=your_secret_key
