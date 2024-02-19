const Blog = require("../models/blog");
const User = require("../models/user");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "659e8361548637ea5f79c790",
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const users = [
  {
    _id: "659e8361548637ea5f79c790",
    username: "Test User",
    name: "dagifsest",
    passwordHash:
      "$2b$10$dwmHQVEzj77I8VZHb3VQ1.q5khnp0D9UGGOTlqH1x9i/yW1KNh2F.",
    blogs: [],
    __v: 0,
  },
  {
    _id: "659d5760f401774ba8dfe22a",
    username: "Dagime Teshome",
    name: "dagime test",
    passwordHash:
      "$2b$10$gW4NuI7uJc2fZXd3K.8Ds.Tlpuq9px1QZ.EC/52IZlTSaaQ3ILHum",
    blogs: [],
    __v: 0,
  },
];
const testUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QgVXNlciIsImlkIjoiNjU5ZTgzNjE1NDg2MzdlYTVmNzljNzkwIiwiaWF0IjoxNzA0ODg5OTUwfQ.5zVJ86lS1LM_nfmuvGBeQ-0u9jhONJV30gyrnu2ujdw";
const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blog = await Blog.find({});
  return blog.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  blogs,
  users,
  testUserToken,
  nonExistingId,
  usersInDb,
  blogsInDb,
};
