const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user").sort({ likes: -1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.UserExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body;
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token invalid" });
  // }
  // const user = await User.findById(decodedToken.id);
  const user = request.user;
  const blog = new Blog({
    title: title,
    url: url,
    author: author,
    likes: likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  logger.infoLogger(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.UserExtractor,
  async (request, response) => {
    const user = request.user;
    const id = request.params.id;
    // const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const blogForDelete = await Blog.findById(id);
    if (blogForDelete?.user?.toString() === user.id) {
      deletion = await Blog.findByIdAndDelete(id);
      if (deletion) {
        user.blogs = user.blogs.filter((blog) => blog.toString() !== id);
        await user.save();
        response.status(202).send("Deletion Successful");
      }
    } else {
      response.status(400).json({
        error: "Unauthorized User",
      });
    }
  }
);

blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  response.status(200).json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  let updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(200).json(updateBlog);
});

module.exports = blogRouter;
