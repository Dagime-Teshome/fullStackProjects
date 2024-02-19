const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const UserObjects = helper.users.map((user) => new User(user));
  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  const promiseArray2 = UserObjects.map((user) => user.save());
  await Promise.all([...promiseArray, ...promiseArray2]);
}, 10000);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("returns all blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.blogs.length);
});

test("check if id exists", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
}, 10000);

test("check if blog can be added", async () => {
  const newBlog = {
    title: "some test title",
    author: "Dagime Zerga",
    url: "https://WTF.com/",
    likes: 999,
    userId: helper.users[0]._id,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${helper.testUserToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).toContain("some test title");
});

test("check if like default to 0", async () => {
  const newBlog = {
    title: "How metal can save your life",
    author: "Led Zeplin",
    url: "https://master of puppets.com/",
    userId: helper.users[0]._id,
  };

  let response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${helper.testUserToken}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
}, 10000);

test("check if title and url are not sent", async () => {
  const newBlog = {
    author: "Led Zeplin",
    likes: 99,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${helper.testUserToken}`)
    .send(newBlog)
    .expect(400);
});

test("check if a single blog can be deleted", async () => {
  const id = helper.blogs[0]._id;
  await api
    .delete(`/api/blogs/${id}`)
    .set("Authorization", `Bearer ${helper.testUserToken}`)
    .expect(202);
  const allBlogs = await helper.blogsInDb();
  expect(allBlogs).toHaveLength(helper.blogs.length - 1);
});

test("check if a blog can be updated", async () => {
  const id = helper.blogs[0]._id;
  const toBeUpdatedBlog = {
    title: "some test title",
    author: "Dagime Zerga",
    url: "https://WTF.com/",
    likes: 999,
  };
  await api.put(`/api/blogs/${id}`).send(toBeUpdatedBlog).expect(200);
  const allBlogs = await helper.blogsInDb();
  const updatedBlog = allBlogs.filter((blog) => blog.id === id)[0];
  expect(updatedBlog).toMatchObject(toBeUpdatedBlog);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
