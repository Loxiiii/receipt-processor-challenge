const express = require('express');
const { postAndProcessReceipt, getPointsByReceiptId } = require('./controllers/receipt');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/receipts/process', postAndProcessReceipt);

app.get('/receipts/:id/points', getPointsByReceiptId);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
