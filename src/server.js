const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const receiptRoutes = require('./routes/receiptRoutes');
const swaggerDef = require('../swaggerDef');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerJsdoc(swaggerDef)));
app.use('/receipts', receiptRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`API docs at http://localhost:${port}/api-docs`);
});
