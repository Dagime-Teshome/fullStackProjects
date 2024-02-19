const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { errorLogger, infoLogger } = require("./logger");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};
const UserExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  const decodedToken = jwt.verify(
    authorization.replace("Bearer ", ""),
    process.env.SECRET
  );
  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};
const requestLogger = (request, response, next) => {
  infoLogger("Method:", request.method);
  infoLogger("Path:  ", request.path);
  infoLogger("Body:  ", request.body);
  infoLogger("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  errorLogger(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "Owner Mismatch") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

module.exports = {
  UserExtractor,
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
