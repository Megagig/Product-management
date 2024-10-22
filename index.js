// Import the express module

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Import the path module
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

const productRoutes = require('./routes/productRoutes');
const { swaggerSpec, swaggerUi } = require('./swagger');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Define the port number
// const port = 3000;
app.use(express.json()); // JSON Body parser middleware
app.use('/api/v1/products', productRoutes);

// Serve the Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
