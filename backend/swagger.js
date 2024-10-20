// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'City Chatbot API', // Title of the API
      version: '1.0.0', // Version of the API
      description: 'API documentation for City Chatbot',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Define where your endpoints are defined
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
