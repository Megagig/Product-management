const mongoose = require('mongoose');

// Get a product by its ID
const getProductById = async (req, res) => {
  try {
    const product = await mongoose.model('products').findById(req.params.id);
    if (!product) {
      res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving product',
      error: error.message,
    });
    return;
  }
};
module.exports = getProductById;
