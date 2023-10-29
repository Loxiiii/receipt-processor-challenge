# Receipt Processor API

The Receipt Processor API is a Node.js application that processes receipts and awards points based on specific rules. This API provides two endpoints, one for processing receipts and another for retrieving points based on the processed receipt.

## Table of Contents
- [Getting Started](#getting-started)
  - [Running with Docker](#running-with-docker)
  - [Running natively](#running-natively)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
  - [Process Receipts](#process-receipts)
  - [Get Points](#get-points)
- [Example Usage](#example-usage)
- [Rules](#rules)
- [Authors](#authors)
- [License](#license)

## Getting Started

These instructions will help you get your Receipt Processor API up and running. You can run the API two ways: using Docker or natively in your machine

### Running with Docker

If you prefer to run the application in a Docker container, follow these steps:

1. Clone the repository to your local machine:
  ```bash
  git clone https://github.com/Loxiiii/receipt-processor-challenge.git
  ```
2. Navigate to the project directory:
```bash
cd receipt-processor-challenge
```

3. Build a Docker image from the provided Dockerfile:

  ```bash
  docker build -t loxiiii/receipt-processor .
  ```

4. Run the docker container:

  ```bash
  docker run --name loxiiii-receipt-processor-container -p 49160:1010 loxiiii/receipt-processor
  ```

  Note: the -p flag allows for port-forwarding `<local-machine-port>:<docker-container-port>`. In the provided example, requests to port 49160 on the local machine
  will be redirected to port 1010 of the docker container.
  When testing this API, please send your requests to port 49160 of your local machine.

  Your Receipt Processor API should now be running and accessible at http://localhost:49160

5. Test the application:
  ```bash
  docker exec -it loxiiii-receipt-processor-container npm run test


### Running natively

If you prefer to run the API natively in your machine. Please make sure you have Node.js 19.0.0 or newer to run this service.
To run the API, follow these steps:

1. Clone the repository to your local machine:
  ```bash
  git clone https://github.com/Loxiiii/receipt-processor-challenge.git
  ```
2. Navigate to the project directory:
```bash
cd receipt-processor-challenge
```

3. Install project dependencies:
```bash
npm install
```

4. Start the application:
```bash
npm run dev
```

5. Test the application: Once the server is running, open a different terminal and run:
```bash
npm run test
```

## API Endpoints

### Process Receipts

- **Path**: `/receipts/process`
- **Method**: POST
- **Payload**: Receipt JSON
- **Response**: JSON containing an ID for the receipt

Description:

Takes in a JSON receipt and returns a JSON object with an ID generated by the code.

### Get Points

- **Path**: `/receipts/{id}/points`
- **Method**: GET
- **Response**: A JSON object containing the number of points awarded

A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.

## Example Usage

Here are some examples of how to use the Receipt Processor API:

**Example Request to Process Receipt**

```http
POST /receipts/process
Content-Type: application/json

{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },
    {
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },
    {
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },
    {
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },
    {
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```
Example Response for Get Points

```http
GET /receipts/<receipt-uuid>/points

{
  "points": 28
}
```

### Rules
The points awarded to a receipt are determined by the following rules:

- One point for every alphanumeric character in the retailer name.
- 50 points if the total is a round dollar amount with no cents.
- 25 points if the total is a multiple of 0.25.
- 5 points for every two items on the receipt.
- If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
- 6 points if the day in the purchase date is odd.
- 10 points if the time of purchase is after 2:00pm and before 4:00pm.

### Authors
Javier Campos - www.github.com/Loxiiii

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.







