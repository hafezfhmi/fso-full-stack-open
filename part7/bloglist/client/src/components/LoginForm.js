import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setUser } from "../reducers/userReducer";
import { displayNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let loggedUser = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatch(displayNotification({ message: `Logged in` }));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(
        displayNotification({
          message: `wrong username or password`,
          type: "danger",
        })
      );
    }
  };

  return (
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
};

export default LoginForm;
