# Receipt Processor

Process receipts and calculate points based on rules. Built with Node.js and Express.

## Quick Start

With Node:
```bash
npm install
npm start
```

With Docker:
```bash
docker build -t receipt-processor .
docker run -p 3000:3000 receipt-processor
```

View the API docs at `http://localhost:3000/api-docs`

## Points Rules

- One point per alphanumeric character in retailer name
- 50 points if total is a round dollar amount
- 25 points if total is a multiple of 0.25
- 5 points for every two items
- For items with descriptions of length divisible by 3: multiply price by 0.2 and round up
- 6 points if purchase day is odd
- 10 points if purchase time is 2:00pm - 4:00pm

## API Endpoints

### Process Receipt
```bash
POST /receipts/process

{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    }
  ],
  "total": "6.49"
}
```

### Get Points
```bash
GET /receipts/{id}/points
```

## Development

```bash
# Run with hot reload
npm run dev

# Run tests
npm test
```

## Validation

- Retailer: alphanumeric, spaces, hyphens, '&'
- Date: YYYY-MM-DD
- Time: HH:MM (24hr)
- Items: At least one
- Prices: XX.XX format

## Project Structure
```
src/
├── server.js
├── controllers/
├── routes/
├── services/
└── __tests__/
```

## Requirements

- Node.js 18+
- npm
- Docker (optional)

