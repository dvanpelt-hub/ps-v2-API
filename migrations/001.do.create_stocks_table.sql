CREATE TABLE stocks_table (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  ticker_symbol VARCHAR(50) NOT NULL,
  investment_status VARCHAR(10) NOT NULL,
  valuation VARCHAR(20) NOT NULL,
  subject_line VARCHAR(50) NOT NULL,
  post VARCHAR(250) NOT NULL,
  purchase_price NUMERIC NOT NULL,
  username VARCHAR(30) NOT NULL,
  posted_date NUMERIC NOT NULL
)