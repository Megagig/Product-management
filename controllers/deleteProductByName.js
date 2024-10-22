const mongoose = require('mongoose');
const productModel = require('../models/product');

const deleteProductByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    const product = await productModel.findOneAndDelete({ name });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deleteProductByName;
