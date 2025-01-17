# Receipt Processor

A REST API service that processes receipts and calculates reward points based on specific rules.

## Features

- Process receipts and calculate points based on various rules
- Retrieve points for processed receipts
- OpenAPI/Swagger documentation
- Docker support
- Automated tests

## Rules for Points Calculation

Points are awarded based on the following rules:

1. One point for every alphanumeric character in the retailer name
2. 50 points if the total is a round dollar amount with no cents
3. 25 points if the total is a multiple of 0.25
4. 5 points for every two items on the receipt
5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer
6. 6 points if the day in the purchase date is odd
7. 10 points if the time of purchase is between 2:00pm and 4:00pm

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm
- Docker (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/receipt-processor.git
```

2. Navigate to the project directory:

```bash
cd receipt-processor
```

3. Install dependencies:

```bash
npm install
```

4. Run the server:

```bash
npm start
```

5. Access the API documentation at:

```bash
http://localhost:3000/api-docs
```

