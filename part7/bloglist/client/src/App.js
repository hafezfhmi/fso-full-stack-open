/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { displayNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Users from "./pages/Users";
import User from "./pages/User";
import Blog from "./pages/Blog";

const App = () => {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

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

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
    dispatch(displayNotification({ message: `Logged out` }));
  };

  return (
    <Router>
      <nav style={{ backgroundColor: "gray", padding: "2px 4px" }}>
        <Link to={"/"}>blogs</Link> <Link to={"/users"}>users</Link>{" "}
        {user && (
          <span>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </nav>

      <h2>blog app</h2>
      {notification && <Notification message={notification} />}

      <Routes>
        <Route path="/" element={!user ? <LoginForm /> : <BlogList />} />
        <Route
          path="/blogs/:blogId"
          element={!user ? <LoginForm /> : <Blog />}
        />
        <Route path="/users" element={!user ? <LoginForm /> : <Users />} />
        <Route path="/users/:userId" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
