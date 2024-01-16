const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (
    !(password && username && !(password.length < 3 && username.length < 3))
  ) {
    return response.status(404).send("Bad Request");
  }
  const saltRound = 10;
  const passWordHash = await bcrypt.hash(password, saltRound);
  const user = new User({
    username: username,
    name: name,
    passwordHash: passWordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const usersList = await User.find({}).populate("blogs");
  response.status(200).json(usersList);
});

userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
  response.status(200).json(user);
});

module.exports = userRouter;
