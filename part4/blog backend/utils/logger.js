const infoLogger = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const errorLogger = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

module.exports = {
  infoLogger,
  errorLogger,
};
