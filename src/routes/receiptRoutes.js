const router = require('express').Router()
const receipts = require('../controllers/receiptController')

/**
 * @swagger
 * /receipts/process:
 *   post:
 *     summary: Process a receipt
 *     tags: [Receipts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 */
router.post('/process', receipts.process.bind(receipts))

/**
 * @swagger
 * /receipts/{id}/points:
 *   get:
 *     summary: Get receipt points
 *     tags: [Receipts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: integer
 */
router.get('/:id/points', receipts.getPoints.bind(receipts))

module.exports = router 