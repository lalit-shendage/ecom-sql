# E-commerce Application

This is an e-commerce application that allows users to browse products, add them to their cart, and place orders. The application is built using Node.js, Express.js, and MySQL.

## Technologies Used

    Node.js
    Express.js
    MySQL
    JSON Web Tokens (JWT) for authentication

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

   ```

2. Install dependencies

   ```bash
   cd ecommerce-app
   npm install

   ```

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

   ```

5. Start the server:

   ```bash
       npm start

   ```

6. The server should now be running on http://localhost:3000.

## Api Endpoints



### User Authentication

    Sign Up
        URL: /auth/signup
        Method: POST
        Description: Allows a new user to sign up by providing their username, email, and password.
        Request Body:

        ```bash

    {
        "username": "example_user",
        "email": "user@example.com",
        "password": "example_password"
    }

        ```


    Response: Returns a JSON object with the newly created user's information if successful, including the user ID and access token.

Log In

    URL: /auth/login
    Method: POST
    Description: Allows an existing user to log in by providing their email and password.
    Request Body:

    ```bash

        {
            "email": "user@example.com",
            "password": "example_password"
        }

    ```

        Response: Returns a JSON object with the user's information and access token if successful.

### Note 

    Every endpoint after this requires the authorization: token and content-type: application/json inside its header

    For reference postman collection is provided in root directory of this application

#### Product Management

    Create Product
        URL: /products
        Method: POST
        Description: Allows an admin user to create a new product by providing the product details, including name, description, price, etc.
        Request Body:

        ```bash

        {
            "name": "Product Name",
            "description": "Product Description",
            "price": 99.99,
            "quantity": 10,
            "availability": true
        }

        ```

        Response: Returns a JSON object with the details of the newly created product.

    Get Products by category 
        URL: /category/:categoryId
        Method: GET
        Description: Retrieves all available products from the database.
        Response: Returns an array of JSON objects, each representing a product.

    Get Product by ID
        URL: /products/:id
        Method: GET
        Description: Retrieves a specific product by its ID.
        Response: Returns a JSON object with the details of the requested product.

    Get All Categories

        URL: /categories
        Method: GET
        Description: Retrieves all available categories from the database.
        Response: Returns an array of JSON objects, each representing a category.

    Create Category

        URL: /categories
        Method: POST
        Description: Allows an admin user to create a new category by providing the category name.
        Request Body:

        ```bash

            {
            "name": "Category Name"
            }

        ```

        Response: Returns a JSON object with the details of the newly created category.

#### Cart Management

    Add Product to Cart
        URL: /cart/addToCart
        Method: POST
        Description: Allows a user to add a product to their cart by providing the product ID and quantity.
        Request Body:

        ```bash

    {
        "productId": 123,
        "quantity": 2
    }
        ```
        Response: Returns a JSON object confirming that the product has been added to the cart.

    Get User's Cart

        URL: /cart/view
        Method: GET
        Description: Retrieves the current user's cart contents.
        Response: Returns an array of JSON objects, each representing a product in the cart.

    Update Cart Item

        URL: /cart/update
        Method: PUT
        Description: Updates the quantity of a specific item in the cart.
        Request Body:

    ```bash

        {
            "quantity": 3
        }
    ```

        Response: Returns a JSON object confirming that the cart item has been updated.

    Remove Cart Item
        URL: /cart/remove/:id
        Method: DELETE
        Description: Removes a specific item from the user's cart.
        Response: Returns a JSON object confirming that the cart item has been removed.

#### Order Management

    Place Order
        URL: /order/place
        Method: POST
        Description: Allows a user to place an order for the items in their cart.
        Request Body:

        ```bash

            {
                "userId": 1,
                "products": [
                    {
                        "productId": 2,
                        "quantity": 2
                    },
                    {
                        "productId": 1,
                        "quantity": 1
                    }
                ]
            }
        ```

        Response: Returns a JSON object confirming that the order has been placed, along with the order ID.

    Get Order History

        URL: /order/history
        Method: GET
        Description: Retrieves the order history for the current user.
        Response: Returns an array of JSON objects, each representing an order.

    Get Order by ID

        URL: /api/orders/:id
        Method: GET
        Description: Retrieves a specific order by its ID.
        Response: Returns a JSON object with the details of the requested order.

## Author

- [Lalit Shendage](https://github.com/lalit-shendage)

