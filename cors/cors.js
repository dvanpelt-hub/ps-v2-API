const cors = require("cors");

const CLIENT_ORIGIN = {
  origin: ["http://localhost:8080/api/v2", "http://localhost:8080"],
  optionsSuccessStatus: 200,
};

module.exports = cors(CLIENT_ORIGIN);
