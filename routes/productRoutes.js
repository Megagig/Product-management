const express = require('express');
const addProduct = require('../controllers/addProduct');
const getAllProducts = require('../controllers/getAllProducts');
const getProductName = require('../controllers/getProductName');
const getProductById = require('../controllers/getProductById');
const updateProductByname = require('../controllers/updateProductByName');
const updateProductById = require('../controllers/updateProductById');
const deleteProductByName = require('../controllers/deleteProductByName');
const deleteProductById = require('../controllers/deleteProductById');

const router = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *               price:
 *                 type: number
 *                 description: The product price
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The product ID
 *                 name:
 *                   type: string
 *                   description: The product name
 *                 price:
 *                   type: number
 *                   description: The product price
 */
router.post('/add', addProduct);
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products from the database
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Products retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving products
 *                 error:
 *                   type: string
 *                   description: Error message
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         # Add other properties of your product model here
 *       example:
 *         _id: '60d5ecb74f52a531a4d3e2c5'
 *         name: 'Sample Product'
 *         # Add example values for other properties
 */
router.get('/all-products', getAllProducts);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get a product by name
 *     description: Retrieve a product from the database by its name
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product name is required'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Internal server error'
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *       example:
 *         _id: '60d5ecb74f52a531a4d3e2c5'
 *         name: 'Sample Product'
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */
router.get('/name', getProductName);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *       example:
 *         id: 5f9d88b7c2f3d62e9c3f29a1
 *         name: Sample Product
 *         price: 19.99
 */
router.get('/:id', getProductById);
/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     summary: Update a product by name
 *     description: Update a product's name in the database
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Current name of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 description: New name for the product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingFields:
 *                 value:
 *                   error: 'Product name and new name are required'
 *               duplicateName:
 *                 value:
 *                   error: 'New product name already exists'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Internal server error'
 */
router.put('/update-by-name', updateProductByname);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's name in the database using its ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missingName:
 *                 value:
 *                   error: 'Product name is required'
 *               duplicateName:
 *                 value:
 *                   error: 'New product name already exists'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Internal server error'
 */
router.put('/:id', updateProductById);
/**
 * @swagger
 * /api/v1/products:
 *   delete:
 *     summary: Delete a product by name
 *     description: Delete a product from the database using its name
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Product deleted successfully'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product name is required'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Internal server error'
 */
router.delete('/delete-product', deleteProductByName);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product from the database using its ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Product deleted successfully'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 'Internal server error'
 */
router.delete('/:id', deleteProductById);

module.exports = router;
