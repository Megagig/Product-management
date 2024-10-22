const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PMan API',
      description: 'Product Management API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/productRoutes.js'], // Path to your  API routes files
};

const swaggerSpec = swaggerJSdoc(options);

module.exports = { swaggerSpec, swaggerUi };
