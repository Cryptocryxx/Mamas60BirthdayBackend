const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'API for managing users'
        },
        servers: [
            {
                url: 'http://localhost:3005/api',
                description: 'Development server'
            }
        ]
    },
    apis: ['./routers/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;