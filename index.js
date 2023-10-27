const express = require('express');
const uuid = require('uuid');
const calculatePoints = require('./helpers/helpers');

const app = express();
const port = 3000;

const receipts = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/receipts/process', (req, res) => {
  // check if new receipt already exists
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
    console.log(receipts);
    res.status(200).json({ id: receipt.id });
  }
});

app.get('/receipts/:id/points', (req, res) => {
  const requestedId = req.params.id;
  const requestedReceipt = receipts.find((receipt) => receipt.id === requestedId);
  res.status(200).json({ points: requestedReceipt.points });
  // console.log('These are the request parameters: ', req.params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
