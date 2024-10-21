const mongoose = require('mongoose');
const productModel = require('../models/product');

const updateProductById = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'New product name already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateProductById;
