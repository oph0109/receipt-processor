const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const receiptRoutes = require('./routes/receiptRoutes');
const swaggerDefinition = require('../swaggerDef');

const app = express();

// Initialize Swagger
const specs = swaggerJsdoc(swaggerDefinition);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/receipts', receiptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
