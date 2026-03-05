const { CLIENT_URL } = require("./env");

module.exports = {
    corsOptions: {
        origin: CLIENT_URL,
        credentials: true,
  }
};