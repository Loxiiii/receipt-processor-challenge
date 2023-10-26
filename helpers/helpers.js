const countAlphanumericCharacters = (string) => {
  const characters = string.match(/[a-zA-Z0-9]/g);
  return characters ? characters.length : 0;
};

const totalCentPoints = (receipt) => {
  const cents = receipt.total.slice(-2);
  if (cents === '00') {
    return 50;
  } if (cents === '25' || cents === '75') {
    return 25;
  }
  return 0;
};

const calculatePoints = (receipt) => {
  let points = 0;
  points += countAlphanumericCharacters(receipt.retailer) + totalCentPoints(receipt);

  return points;
};

module.exports = calculatePoints;
