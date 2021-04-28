const path = require("path");
const express = require("express");
const xss = require("xss");
const StocksService = require("./stocks-service");

const stocksRouter = express.Router();
const jsonParser = express.json();

const sanitizeStocks = (stock) => ({
  ...stock,
  name: xss(stock.ticker_symbol),
});

stocksRouter
  .route("/stocks")
  .get((req, res, next) => {
    StocksService.getAllStocks(req.app.get("db"))
      .then((stock) => {
        res.json(stock.map(sanitizeStocks));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      ticker_symbol,
      investment_status,
      valuation,
      subject_line,
      post,
      purchase_price,
      username,
      posted_date,
    } = req.body;
    for (const [key, value] of Object.entries(
      ticker_symbol,
      investment_status,
      valuation,
      subject_line,
      post,
      purchase_price,
      username,
      posted_date
    )) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` },
        });
      }
    }
    StocksService.insertStockDetails(
      req.app.get("db"),
      ticker_symbol,
      investment_status,
      valuation,
      subject_line,
      post,
      purchase_price,
      username,
      posted_date
    )
      .then((stock) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${stock.id}`));
        res.json(sanitizeStocks(stock));
      })
      .catch(next);
  });

stocksRouter
  .route("/stocks/:ticker_symbol")
  .all((req, res, next) => {
    StocksService.getStockById(req.app.get("db"), req.params.ticker_symbol)
      .then((stock) => {
        if (!stock) {
          return null;
        }
        res.stock = stock;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(sanitizeStocks(res.stock));
  });

module.exports = stocksRouter;
