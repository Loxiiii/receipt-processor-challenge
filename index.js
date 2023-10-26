const express = require('express');
const uuid = require('uuid');

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
      content: req.body,
    };
    receipts.push(receipt);
    console.log(receipts);
    res.status(200).json({ id: receipt.id });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
