require("dotenv").config();
const express = require("express");
const stocksRouter = require("./stocks_knex/stocks-router");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { CLIENT_ORIGIN } = require("../cors/cors");
const { NODE_ENV } = require("../config");
const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors(CLIENT_ORIGIN));
app.use(express.json());
app.use(morgan(morganOption));
app.use(helmet());

app.use("/", (req, res) => {
  res.send("Landing Page");
});
app.use("/api/v2", stocksRouter);

module.exports = app;
