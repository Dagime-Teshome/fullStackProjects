const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
require("express-async-errors");
const loginRouter = require("./controllers/login");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();
const { infoLogger, errorLogger } = require("./utils/logger");

infoLogger("connecting to", config.url);

mongoose
  .connect(config.url)
  .then(() => {
    infoLogger("connected to MongoDB");
  })
  .catch((error) => {
    errorLogger("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
