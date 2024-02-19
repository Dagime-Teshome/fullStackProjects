require("dotenv").config();

const config = {
  port: process.env.PORT,
  url:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
};

module.exports = config;
