const StocksService = {
  getAllStocks(knex) {
    return knex.select("*").from("stocks_table");
  },
  insertStockDetails(
    knex,
    ticker_symbol,
    investment_status,
    valuation,
    subject_line,
    post,
    purchase_price,
    username,
    posted_date
  ) {
    return knex("stocks_table")
      .insert({
        ticker_symbol,
        investment_status,
        valuation,
        subject_line,
        post,
        purchase_price,
        username,
        posted_date,
      })
      .returning("*")
      .then((rows) => rows[0]);
  },
  getStockById(knex, ticker_symbol) {
    return knex
      .from("stocks_table")
      .select("*")
      .where("ticker_symbol", ticker_symbol);
  },
};

module.exports = StocksService;
