// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const PORT = process.env.PORT || 8070;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); //Parsing incoming request bodies URL-encoded form data
app.use(express.json()) // Parsing req body
app.use(cors()) // Enable cross-platform data exchange

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// const orderRoutes = require('./router/order');
// const menuItemsRoutes = require('./router/menu_items');
// const cartRoutes = require('./router/cart');
// const index = require('./router/index');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

// app.use('/api', index);
// app.use('/cart', cartRoutes)
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.send('home');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
