const uuid = require('uuid');
const calculatePoints = require('../helpers/helpers');

const receipts = [];

const postAndProcessReceipt = (req, res) => {
  const existingReceipt = receipts.find(
    (receipt) => JSON.stringify(receipt.content) === JSON.stringify(req.body),
  );

  if (existingReceipt) {
    res.status(400).send('That receipt already exists in the database');
  } else {
    const receipt = {
      id: uuid.v4(),
      points: calculatePoints(req.body),
      content: req.body,
    };
    receipts.push(receipt);
    res.status(200).json({ id: receipt.id });
  }
};

const getPointsByReceiptId = (req, res) => {
  const requestedId = req.params.id;
  const requestedReceipt = receipts.find((receipt) => receipt.id === requestedId);
  res.status(200).json({ points: requestedReceipt.points });
};

module.exports = {
  postAndProcessReceipt,
  getPointsByReceiptId,
};
