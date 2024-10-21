const mongoose = require('mongoose');
const productModel = require('../models/product');

const getProductName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    const product = await productModel.findOne({ name });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = getProductName;
