/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    let loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      loggedUser = JSON.parse(loggedUser);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleNotification = (notification) => {
    setNotification(notification);

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let loggedUser = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      handleNotification({ message: `Logged in` });
      setUsername("");
      setPassword("");
    } catch (error) {
      handleNotification({
        message: `wrong username or password`,
        type: "danger",
      });
    }
  };

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility();

      let newBlog = await blogService.addBlog(blog);
      setBlogs((latestBlogs) => latestBlogs.concat(newBlog));
      handleNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
    } catch (error) {
      handleNotification({
        message: `error creating new blog`,
        type: "danger",
      });
    }
  };

  const updateBlogLikes = async (blog) => {
    try {
      let newBlog = await blogService.updateLikes(blog.id, blog.likes + 1);

      setBlogs(blogs.map((curr) => (curr.id !== newBlog.id ? curr : newBlog)));
    } catch (error) {
      handleNotification({ message: `error liking blog`, type: "danger" });
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);

      setBlogs(blogs.filter((curr) => curr.id !== blogId));

      handleNotification({ message: `deleted blog` });
    } catch (error) {
      handleNotification({ message: `error deleting blog`, type: "danger" });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("loggedUser");
    setUser(null);
    handleNotification({ message: `Logged out` });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  );

  const blogList = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          setBlogs={setBlogs}
          handleNotification={handleNotification}
          createBlog={createBlog}
        />
      </Togglable>
      <div id="blog-wrapper">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={updateBlogLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </div>
    </div>
  );

  const ErrorNotification = ({ message }) => (
    <p
      style={
        message.type === "danger"
          ? {
              backgroundColor: "#f1f1f1",
              color: "red",
              border: "2px solid red",
              padding: "5px",
            }
          : {
              backgroundColor: "#f1f1f1",
              color: "green",
              border: "2px solid green",
              padding: "5px",
            }
      }
    >
      {message.message}
    </p>
  );

  return (
    <div>
      <h2>blogs</h2>
      {notification && <ErrorNotification message={notification} />}
      {!user ? loginForm() : blogList()}
    </div>
  );
};

export default App;
