const receiptService = require('../services/receiptService');

describe('ReceiptService', () => {
  const validReceipt = {
    retailer: "Target",
    purchaseDate: "2022-01-01",
    purchaseTime: "13:01",
    items: [
      {
        shortDescription: "Mountain Dew 12PK",
        price: "6.49"
      }
    ],
    total: "6.49"
  };

  describe('validateReceipt', () => {
    test('should validate a correct receipt', () => {
      expect(() => receiptService.validateReceipt(validReceipt)).not.toThrow();
    });

    test('should throw error for invalid retailer', () => {
      const invalidReceipt = {
        ...validReceipt,
        retailer: "Target!!!"
      };
      expect(() => receiptService.validateReceipt(invalidReceipt)).toThrow();
    });
  });

  describe('calculatePoints', () => {
    test('should calculate points for retailer name', () => {
      const receipt = {
        ...validReceipt,
        retailer: "Target"
      };
      const points = receiptService.calculatePoints(receipt);
      expect(points).toBeGreaterThanOrEqual(6); // 'Target' has 6 alphanumeric chars
    });

    test('should award 50 points for round dollar amount', () => {
      const receipt = {
        ...validReceipt,
        total: "100.00"
      };
      const points = receiptService.calculatePoints(receipt);
      expect(points).toBeGreaterThanOrEqual(50);
    });

    test('should award points for purchase time between 2:00 and 4:00', () => {
      const receipt = {
        ...validReceipt,
        purchaseTime: "14:30"
      };
      const points = receiptService.calculatePoints(receipt);
      expect(points).toBeGreaterThanOrEqual(10);
    });
  });
}); 