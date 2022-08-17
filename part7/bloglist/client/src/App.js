/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { displayNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

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
      <h2>blogs</h2>
      {notification && <Notification message={notification} />}
      {user && (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={!user ? <LoginForm /> : <BlogList />} />
      </Routes>
    </Router>
  );
};

export default App;
