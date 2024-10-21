// Import the express module
const express = require('express');
const productRoutes = require('./routes/productRoutes');

// Create an Express application
const app = express();

// Define the port number
const port = 3000;
app.use(express.json()); // JSON Body parser middleware
app.use('/api/v1/products', productRoutes);

// Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World! Welcome to my Express server.');
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
