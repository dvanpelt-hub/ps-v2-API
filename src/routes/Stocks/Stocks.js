const express = require("express");
const stocksRouter = express.Router();

stocksRouter.get("/", (req, res) => {
  res.send("Pocket Stocks app v2");
});

module.exports = stocksRouter;
