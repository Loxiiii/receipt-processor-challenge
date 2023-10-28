/* eslint-disable no-undef */
const {
  countAlphanumericCharacters,
  totalCentPoints,
  numOfItemsPoints,
  shortDescriptionItemPoints,
  shortDescriptionReceiptPoints,
  oddDayPoints,
  timeOfPurchasePoints,
} = require('./helpers/helpers');

describe('Helper functions working correctly', () => {
  // Alphanumeric Characters
  describe('countAlphanumericCharacters works correctly', () => {
    test('Returns 0 to an empty string', () => {
      expect(countAlphanumericCharacters('')).toBe(0);
    });

    test('Only counts alphanumeric characters', () => {
      expect(countAlphanumericCharacters('M&M Corner Market')).toBe(14);
    });

    test('Ignores blank spaces', () => {
      expect(countAlphanumericCharacters('Jewel Osco')).toBe(9);
    });
  });

  // Total Cents
  describe('totalCentPoints works correctly', () => {
    const fullDollar = {
      total: '3,00',
    };
    const m25 = {
      total: '3,25',
    };
    const m50 = {
      total: '3,50',
    };
    const m75 = {
      total: '3,75',
    };
    const notMultiple = {
      total: '3,87',
    };
    test('Returns 75 when the cents are 00 (full dollar)', () => {
      expect(totalCentPoints(fullDollar)).toBe(75);
    });

    describe('Returns 25  when the cents are multiples of 25', () => {
      test('Returns 25 when the cents are 25', () => {
        expect(totalCentPoints(m25)).toBe(25);
      });
      test('Returns 25 when the cents are 50', () => {
        expect(totalCentPoints(m50)).toBe(25);
      });
      test('Returns 25 when the cents are 75', () => {
        expect(totalCentPoints(m75)).toBe(25);
      });
    });

    test('Returns 0  when the cents are not 00, 25, 50 or 75', () => {
      expect(totalCentPoints(notMultiple)).toBe(0);
    });
  });

  describe('numOfItemsPoints works correctly', () => {
    const numOfItemsTest = {
      items: [
        1, 2, 3, 4, 5,
      ],
    };
    test('Returns 5 times the number of pairs of items in the receipt', () => {
      expect(numOfItemsPoints(numOfItemsTest)).toBe(10);
    });
  });

  describe('shortDescriptionItemPoints works correclty', () => {
    const emptyDesc = {
      shortDescription: '',
      price: 12.25,
    };

    const withDesc = {
      shortDescription: 'Emils Cheese Pizza',
      price: 12.25,
    };

    test('Returns 0 when an empty description', () => {
      expect(shortDescriptionItemPoints(emptyDesc)).toBe(0);
    });

    test('When the trimmed length is multiple of 3, returns 0.2 times the price, and rounds up', () => {
      expect(shortDescriptionItemPoints(withDesc)).toBe(3);
    });
  });

  describe('shortDescriptionReceiptPoints works correctly', () => {
    const noItems = {
      items: [],
    };
    test('Returns 0 when there are no items', () => {
      expect(shortDescriptionReceiptPoints(noItems)).toBe(0);
    });
  });

  describe('oddDayPoints works correctly', () => {
    const odd = {
      purchaseDate: '2022-01-01',
    };

    const even = {
      purchaseDate: '2022-01-04',
    };
    test('If the day is odd, returns 6', () => {
      expect(oddDayPoints(odd)).toBe(6);
    });

    test('If the day is even, returns 0', () => {
      expect(oddDayPoints(even)).toBe(0);
    });
  });

  describe('timeOfPurchasePoints works correctly', () => {
    const inRange = {
      purchaseTime: '14:01',
    };

    const outOfRange = {
      purchaseTime: '13:01',
    };

    const atTwo = {
      purchaseTime: '14:00',
    };

    const atFour = {
      purchaseTime: '16:00',
    };

    test('If the time of purchase is after 2:00 PM and before 4:00 PM, return 10', () => {
      expect(timeOfPurchasePoints(inRange)).toBe(10);
    });

    test('If the time of purchase is not after 2:00 PM and before 4:00 PM, return 0', () => {
      expect(timeOfPurchasePoints(outOfRange)).toBe(0);
    });

    test('If the time of purchase is 2:00 PM, return 0', () => {
      expect(timeOfPurchasePoints(atTwo)).toBe(0);
    });

    test('If the time of purchase is 4:00 PM, return 0', () => {
      expect(timeOfPurchasePoints(atFour)).toBe(0);
    });
  });
});
