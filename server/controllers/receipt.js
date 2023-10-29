const uuid = require('uuid');
const { calculatePoints } = require('../helpers/helpers');

// This array is used to store the data in memory
const receipts = [];

// Controller to store a new receipt, returns the new uuid for the entered receipt
const postAndProcessReceipt = (req, res) => {
  const existingReceipt = receipts.find(
    (receipt) => JSON.stringify(receipt.content) === JSON.stringify(req.body),
  );

  if (existingReceipt) {
    res.status(204).send('That receipt already exists in the database, no resource was created');
  } else {
    const receipt = {
      id: uuid.v4(),
      points: calculatePoints(req.body),
      content: req.body,
    };
    receipts.push(receipt);
    res.status(201).json({ id: receipt.id });
  }
};

// Controller to get the points of a receipt by ID
const getPointsByReceiptId = (req, res) => {
  const requestedId = req.params.id;
  const requestedReceipt = receipts.find((receipt) => receipt.id === requestedId);
  res.status(200).json({ points: requestedReceipt.points });
};

module.exports = {
  postAndProcessReceipt,
  getPointsByReceiptId,
};
