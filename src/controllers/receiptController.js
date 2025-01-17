const receiptService = require('../services/receiptService');

class ReceiptController {
    processReceipt(req, res) {
        try {
            const receipt = req.body;
            const id = receiptService.processReceipt(receipt);
            res.json({ id });
        } catch (error) {
            res.status(400).json({ 
                error: 'The receipt is invalid. Please verify input.'
            });
        }
    }

    getPoints(req, res) {
        const { id } = req.params;
        const receiptData = receiptService.getReceiptPoints(id);

        if (!receiptData) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        res.json({ points: receiptData.points });
    }
}

module.exports = new ReceiptController(); 