const knex = require("knex");
const supertest = require("supertest");
const App = require("../src/app");

describe("Stocks postings endpoint", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    App.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("clean table", () => db("stocks_table").truncate());
  afterEach("cleanup", () => db("stocks_table").truncate());
  context("If there are stocks within the table", () => {
    const testStocks = [
      {
        id: 10001,
        ticker_symbol: "TSLA",
        investment_status: "Sell",
        valuation: "Overvalued",
        subject_line: "Lorem ipsum 1",
        post:
          "Incididunt cillum enim sit ea Lorem excepteur velit ut in duis non pariatur tempor.",
        purchase_price: 802.22,
        username: "stock_guy_123",
        posted_date: 2021,
      },
      {
        id: 10002,
        ticker_symbol: "GOOG",
        investment_status: "Buy",
        valuation: "Undervalued",
        subject_line: "Lorem ipsum 2",
        post:
          "Incididunt cillum enim sit ea Lorem excepteur velit ut in duis non pariatur tempor. Incididunt tempor culpa proident amet.",
        purchase_price: 302.22,
        username: "stock_gal_123",
        posted_date: 2021,
      },
    ];
    beforeEach("insert stocks", () => {
      return db.into("stocks_table").insert(testStocks);
    });
    it("GET all stocks via endpoint: /api/v2/stocks, receive res status of 200", () => {
      return supertest(App).get("/api/v2/stocks").expect(200);
    });
    it("GET stock by ticker_symbol", () => {
      const ticker_symbol = "TSLA";
      return supertest(App).get(`/api/v2/stocks/${ticker_symbol}`).expect(200);
    });
    describe("POST /api/v2", () => {
      it("POSTs a new stock with all applicable details", () => {
        return supertest(App)
          .post("/api/v2/stocks")
          .send({
            id: 10003,
            ticker_symbol: "MSFT",
            investment_status: "Buy",
            valuation: "Undervalued",
            subject_line: "Lorem ipsum 3",
            post:
              "Incididunt cillum enim sit ea Lorem excepteur velit ut in duis non pariatur tempor. Anim laboris nostrud labore dolore veniam et aliqua Lorem ea ea.",
            purchase_price: 300.01,
            username: "stock_gal_456",
            posted_date: 2020,
          })
          .expect(200);
      });
    });
  });
});
