const express = require('express');
const addProduct = require('../controllers/addProduct');
const getAllProducts = require('../controllers/getAllProducts');
const getProductName = require('../controllers/getProductName');
const getProductById = require('../controllers/getProductById');
const updateProductByname = require('../controllers/updateProductByName');
const updateProductById = require('../controllers/updateProductById');

const router = express.Router();

router.post('/add', addProduct);
router.get('/all-products', getAllProducts);
router.get('/name', getProductName);
router.get('/:id', getProductById);
router.put('/update-by-name', updateProductByname);
router.put('/:id', updateProductById);

module.exports = router;
