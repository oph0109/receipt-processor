const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const receiptRoutes = require('./src/routes/receiptRoutes');
const swaggerDefinition = require('./swaggerDef');

const app = express();

// Swagger setup
const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['./src/routes/*.js']
});

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/receipts', receiptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
