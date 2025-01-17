const { v4: uuidv4 } = require('uuid');

// In-memory storage
const receipts = new Map();

class ReceiptService {
    validateReceipt(receipt) {
        // Validate retailer
        if (!receipt.retailer.match(/^[\w\s\-&]+$/)) {
            throw new Error('Invalid retailer name format');
        }

        // Validate purchase date
        if (!/^\d{4}-\d{2}-\d{2}$/.test(receipt.purchaseDate)) {
            throw new Error('Invalid purchase date format');
        }

        // Validate purchase time (24-hour format)
        if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(receipt.purchaseTime)) {
            throw new Error('Invalid purchase time format');
        }

        // Validate total
        if (!receipt.total.match(/^\d+\.\d{2}$/)) {
            throw new Error('Invalid total format');
        }

        // Validate items array
        if (!receipt.items || receipt.items.length < 1) {
            throw new Error('Receipt must include at least one item');
        }

        // Validate each item
        receipt.items.forEach(item => {
            if (!item.shortDescription.match(/^[\w\s\-]+$/)) {
                throw new Error('Invalid item description format');
            }
            if (!item.price.match(/^\d+\.\d{2}$/)) {
                throw new Error('Invalid item price format');
            }
        });
    }

    processReceipt(receipt) {
        try {
            this.validateReceipt(receipt);
            const id = uuidv4();
            receipts.set(id, {
                receipt,
                points: this.calculatePoints(receipt)
            });
            return id;
        } catch (error) {
            throw error;
        }
    }

    getReceiptPoints(id) {
        return receipts.get(id);
    }

    calculatePoints(receipt) {
        let points = 0;

        // Rule 1: One point for every alphanumeric character in the retailer name
        points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

        // Rule 2: 50 points if the total is a round dollar amount
        if (parseFloat(receipt.total).toFixed(2).endsWith('.00')) {
            points += 50;
        }

        // Rule 3: 25 points if the total is a multiple of 0.25
        if (parseFloat(receipt.total) % 0.25 === 0) {
            points += 25;
        }

        // Rule 4: 5 points for every two items
        points += Math.floor(receipt.items.length / 2) * 5;

        // Rule 5: Points for items with description length multiple of 3
        receipt.items.forEach(item => {
            const trimmedLength = item.shortDescription.trim().length;
            if (trimmedLength % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2);
            }
        });

        // Rule 6: 5 points if total is greater than 10.00
        if (parseFloat(receipt.total) > 10.00) {
            points += 5;
        }

        // Rule 7: 6 points if the day in the purchase date is odd
        const purchaseDay = parseInt(receipt.purchaseDate.split('-')[2]);
        if (purchaseDay % 2 === 1) {
            points += 6;
        }

        // Rule 8: 10 points if purchase time is between 2:00pm and 4:00pm
        const purchaseHour = parseInt(receipt.purchaseTime.split(':')[0]);
        const purchaseMinute = parseInt(receipt.purchaseTime.split(':')[1]);
        if ((purchaseHour === 14 || purchaseHour === 15) || 
            (purchaseHour === 13 && purchaseMinute >= 0) || 
            (purchaseHour === 16 && purchaseMinute === 0)) {
            points += 10;
        }

        return points;
    }
}

module.exports = new ReceiptService(); 