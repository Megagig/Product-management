const mongoose = require('mongoose');
const productModel = require('../models/product');

const updateProductByname = async (req, res) => {
  try {
    const { name } = req.query;
    const { newName } = req.body;
    if (!name || !newName) {
      return res
        .status(400)
        .json({ error: 'Product name and new name are required' });
    }
    const product = await productModel.findOneAndUpdate(
      { name },
      { name: newName },
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

module.exports = updateProductByname;
