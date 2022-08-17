/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  updateBlogLikes,
  deleteBlog,
} from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blog);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    let loggedUser = window.localStorage.getItem("loggedUser");

    if (loggedUser) {
      loggedUser = JSON.parse(loggedUser);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleNotification = (notification) => {
    dispatch(displayNotification(notification));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let loggedUser = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      dispatch(setUser(loggedUser));
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

  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
  };

  const handleUpdateBlogLikes = async (blog) => {
    dispatch(updateBlogLikes(blog));
  };

  const handleDeleteBlog = async (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
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
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <div id="blog-wrapper">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={handleUpdateBlogLikes}
              deleteBlog={handleDeleteBlog}
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
