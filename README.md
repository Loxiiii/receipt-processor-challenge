# Receipt Processor API

The Receipt Processor API is a Node.js application that processes receipts and awards points based on specific rules. This API provides two endpoints, one for processing receipts and another for retrieving points based on the processed receipt.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running with Docker](#running-with-docker)
- [API Endpoints](#api-endpoints)
  - [Process Receipts](#process-receipts)
  - [Get Points](#get-points)
- [Example Usage](#example-usage)
- [Rules](#rules)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will help you get your Receipt Processor API up and running. You can run the API two ways: using Docker or natively in your machine

### Docker

If you prefer to run the application in a Docker container, follow these steps:

1. Build a Docker image from the provided Dockerfile:

  ```bash
  docker build -t loxiiii/receipt-processor
  ```

2. Run the docker container:

  ```bash
  docker run -p 49169:1010 loxiiii/receipt-processor
  ```

  Note: the -p flag allows for port-forwarding <local-machine-port>:<docker-container-port>. In the provided example, requests to port 49160 on the local machine
  will be redirected to port 1010 of the docker container.
  When testing this API, please send your requests to port 49160 of your local machine.

  Your Receipt Processor API should now be running and accessible at http://localhost:49160