import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./index.css";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState();
  const blogRef = useRef();
  const loginRef = useRef();

  const fetchData = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const LoggedInUser = window.localStorage.getItem("loggedInUser");
    if (LoggedInUser) {
      const user = JSON.parse(LoggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setNotification(error);
    }
  };
  const setNotification = ({ response }) => {
    setErrorMessage(response.data.error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  const handleBlogSubmit = async (newBlog) => {
    blogRef.current.toggleVisibility();
    try {
      await blogService.CreateBlog(newBlog);
      setBlogs(await blogService.getAll());
    } catch (error) {
      setNotification(error);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken("");
    setUser(null);
  };

  const onBlogDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(await blogService.getAll());
    } catch (error) {
      setNotification(error);
    }
  };
  const onBlogUpdate = async (UpdatedBlog) => {
    try {
      await blogService.updateBlog(UpdatedBlog.id, UpdatedBlog);
      setBlogs(await blogService.getAll());
    } catch (error) {
      setNotification(error);
    }
  };

  return (
    <div>
      <Notification errorMessage={errorMessage} />

      {user ? (
        <>
          {<h1>User:{user?.name}</h1>}{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginForm login={handleLogin}></LoginForm>
      )}
      <h2>blogs</h2>
      <Togglable label="Create Blog" ref={blogRef}>
        <BlogForm createBlog={handleBlogSubmit} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          ondelete={onBlogDelete}
          onupdate={onBlogUpdate}
        />
      ))}
    </div>
  );
};

export default App;
