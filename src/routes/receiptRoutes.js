const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

/**
 * @swagger
 * /receipts/process:
 *   post:
 *     summary: Process a receipt and return points
 *     tags: [Receipts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Receipt processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "7fb1377b-b223-49d9-a31a-5a02701dd310"
 *       400:
 *         description: Invalid receipt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The receipt is invalid. Please verify input."
 */
router.post('/process', receiptController.processReceipt.bind(receiptController));

/**
 * @swagger
 * /receipts/{id}/points:
 *   get:
 *     summary: Get points for a receipt
 *     tags: [Receipts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receipt ID
 *         example: "7fb1377b-b223-49d9-a31a-5a02701dd310"
 *     responses:
 *       200:
 *         description: Points retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: integer
 *                   example: 32
 *       404:
 *         description: Receipt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Receipt not found"
 */
router.get('/:id/points', receiptController.getPoints.bind(receiptController));

module.exports = router; 