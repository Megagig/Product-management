const express = require('express');
const addProduct = require('../controllers/addProduct');
const getAllProducts = require('../controllers/getAllProducts');
const getProductName = require('../controllers/getProductName');
const getProductById = require('../controllers/getProductById');

const router = express.Router();

router.post('/add', addProduct);
router.get('/all-products', getAllProducts);
router.get('/name', getProductName);
router.get('/:id', getProductById);

module.exports = router;
