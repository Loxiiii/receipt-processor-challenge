require('dotenv').config();

const express = require('express');
const { postAndProcessReceipt, getPointsByReceiptId } = require('./controllers/receipt');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/receipts/process', postAndProcessReceipt);

app.get('/receipts/:id/points', getPointsByReceiptId);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
