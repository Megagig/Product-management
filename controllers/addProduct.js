const mongoose = require('mongoose');
const productModel = require('../models/product');

// initialized the Products model (previously set up) for interacting with the database:
const productsModel = mongoose.model('products');

const addProduct = async (req, res) => {
  const { name, price, description } = req.body;

  // Validate the request
  if (!name) {
    return res.status(400).send('Name is required');
  }

  if (!price) {
    return res.status(400).send('Price is required');
  }

  if (!description) {
    return res.status(400).send('Description is required');
  }

  try {
    //create a product
    const createdProduct = await productModel.create({
      name: name,
      price: price,
      description: description,
    });
    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating the product',
      error: error.message,
    });
    return;
  }

  return;
};

module.exports = addProduct;
