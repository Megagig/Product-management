const express = require('express');
const addProduct = require('../controllers/addProduct');

const router = express.Router();

router.post('/add', addProduct);

module.exports = router;
