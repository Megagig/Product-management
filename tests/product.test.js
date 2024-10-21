const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const productModel = require('../models/product');
let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {});
  server = app.listen(3001); // Start the server programmatically
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close(); // Close the server after all tests
});

beforeEach(async () => {
  await productModel.deleteMany({});
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app).post('/api/v1/products/add').send({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe('Test Product');
    expect(res.body.data.price).toBe(100);
    expect(res.body.data.description).toBe('A test product');
  });

  it('should retrieve all products', async () => {
    await productModel.create({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    });
    const res = await request(app).get('/api/v1/products/all-products');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Test Product');
  });

  it('should delete a product by ID', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    });
    const res = await request(app).delete(`/api/v1/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');

    const deletedProduct = await productModel.findById(product._id);
    expect(deletedProduct).toBeNull();
  });

  it('should return 404 when deleting a non-existent product by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/api/v1/products/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });

  it('should get a product by ID', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    });
    const res = await request(app).get(`/api/v1/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Product retrieved successfully');
    expect(res.body.data.name).toBe('Test Product');
    expect(res.body.data.price).toBe(100);
    expect(res.body.data.description).toBe('A test product');
  });

  it('should update a product by ID', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      price: 100,
      description: 'A test product',
    });
    const res = await request(app)
      .put(`/api/v1/products/${product._id}`)
      .send({ name: 'Updated Test Product' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Test Product');

    const updatedProduct = await productModel.findById(product._id);
    expect(updatedProduct.name).toBe('Updated Test Product');
  });
});
