// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const PORT = process.env.PORT || 8070;
const app = express();


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); //Parsing incoming request bodies URL-encoded form data
app.use(express.json()) // Parsing req body
app.use(cors()) // Enable cross-platform data exchange

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own


const index = require('./router/index');

app.use('/api', index);

app.get('/', (req, res) => {
  res.send('home');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
