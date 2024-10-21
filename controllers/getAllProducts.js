const mongoose = require('mongoose');
const getAllProducts = async (req, res) => {
  try {
    const products = await mongoose.model('products').find();
    res.status(200).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving products',
      error: error.message,
    });
    return;
  }
};

module.exports = getAllProducts;
