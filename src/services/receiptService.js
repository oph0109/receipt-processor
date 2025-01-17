const { v4: uuid } = require('uuid');

// In-memory storage
const receipts = new Map();

const isRoundDollar = total => total.endsWith('.00');
const isMultipleOf25 = total => parseFloat(total) % 0.25 === 0;
const isOddDay = date => new Date(date).getDate() % 2 === 1;
const isBetween2And4 = time => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours === 14 || hours === 15) || 
           (hours === 13 && minutes >= 0) || 
           (hours === 16 && minutes === 0);
};

class ReceiptService {
    processReceipt(receipt) {
        const id = uuid();
        receipts.set(id, {
            receipt,
            points: this.calculatePoints(receipt)
        });
        return id;
    }

    getPoints(id) {
        return receipts.get(id);
    }

    calculatePoints(receipt) {
        let points = 0;

        // Retailer name points
        points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

        // Total amount points
        if (isRoundDollar(receipt.total)) points += 50;
        if (isMultipleOf25(receipt.total)) points += 25;

        // Items points
        points += Math.floor(receipt.items.length / 2) * 5;
        
        receipt.items.forEach(item => {
            if (item.shortDescription.trim().length % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2);
            }
        });

        // Time/date points
        if (isOddDay(receipt.purchaseDate)) points += 6;
        if (isBetween2And4(receipt.purchaseTime)) points += 10;

        return points;
    }
}

module.exports = new ReceiptService(); 