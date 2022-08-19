import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setUser } from "../reducers/userReducer";
import { displayNotification } from "../reducers/notificationReducer";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleLogin}>
      <h2 className="my-4">Log in to application</h2>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
