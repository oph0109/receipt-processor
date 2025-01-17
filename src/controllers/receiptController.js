const receiptService = require('../services/receiptService');

class ReceiptController {
    process(req, res) {
        try {
            const id = receiptService.processReceipt(req.body);
            res.json({ id });
        } catch (err) {
            res.status(400).json({ 
                error: 'The receipt is invalid. Please verify input.'
            });
        }
    }

    getPoints(req, res) {
        const data = receiptService.getPoints(req.params.id);
        
        if (!data) {
            return res.status(404).json({ error: 'Receipt not found' });
        }

        res.json({ points: data.points });
    }
}

module.exports = new ReceiptController(); 