require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DB_URL || "postgresql://postgres@localhost/stocks_table",
  TEST_DATABASE_URL: process.env.TEST_DB_URL,
};
