module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Receipt Processor API',
      version: '1.0.0',
      description: 'API for processing receipts and calculating reward points'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Receipt: {
          type: 'object',
          required: ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'],
          properties: {
            retailer: {
              type: 'string',
              pattern: '^[\\w\\s\\-&]+$'
            },
            purchaseDate: {
              type: 'string',
              format: 'date'
            },
            purchaseTime: {
              type: 'string',
              pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$'
            },
            items: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['shortDescription', 'price'],
                properties: {
                  shortDescription: {
                    type: 'string',
                    pattern: '^[\\w\\s\\-]+$'
                  },
                  price: {
                    type: 'string',
                    pattern: '^\\d+\\.\\d{2}$'
                  }
                }
              }
            },
            total: {
              type: 'string',
              pattern: '^\\d+\\.\\d{2}$'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
}; 