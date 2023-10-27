const countAlphanumericCharacters = (string) => {
  const characters = string.match(/[a-zA-Z0-9]/g);
  return characters ? characters.length : 0;
};

const totalCentPoints = (receipt) => {
  const cents = receipt.total.slice(-2);
  if (cents === '00') {
    return 75;
  } if (cents === '25' || cents === '50' || cents === '75') {
    return 25;
  }
  return 0;
};

const numOfItemsPoints = (receipt) => 5 * Math.floor(receipt.items.length / 2);

const shortDescriptionItemPoints = (item) => (item.shortDescription.trim().length % 3 === 0
  ? Math.ceil(0.2 * item.price) : 0);

const shortDescriptionReceiptPoints = (receipt) => {
  let points = 0;
  receipt.items.forEach((item) => {
    points += shortDescriptionItemPoints(item);
  });
  return points;
};

const oddDayPoints = (receipt) => {
  const splitDate = receipt.purchaseDate.split('-');
  const day = splitDate[2];
  return day % 2 !== 0 ? 6 : 0;
};

const timeOfPurchasePoints = (receipt) => {
  const splitTime = receipt.purchaseTime.split(':');
  const hour = parseInt(splitTime[0], 10);
  const minute = parseInt(splitTime[1], 10);
  if ((hour === 14 && minute > 0) || hour === 15) {
    return 10;
  }

  return 0;
};

const calculatePoints = (receipt) => {
  let points = 0;
  points += countAlphanumericCharacters(receipt.retailer) + totalCentPoints(receipt)
    + numOfItemsPoints(receipt) + shortDescriptionReceiptPoints(receipt)
    + oddDayPoints(receipt) + timeOfPurchasePoints(receipt);

  return points;
};

module.exports = calculatePoints;
