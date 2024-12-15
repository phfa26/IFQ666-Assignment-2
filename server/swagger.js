// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Set up Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Daily Reflection Journal API',
            version: '1.0.0',
            description: 'API documentation for the Daily Reflection Journal application',
        },
        servers: [
            {
                url: 'http://localhost:3007/api', // Replace with your server URL
            },
        ],
    },
    // Path to your API specs
    apis: ['./routes/*.js'],  // You can point this to your routes or controllers
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
