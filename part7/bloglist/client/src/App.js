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
import Users from "./pages/Users";
import User from "./pages/User";
import Blog from "./pages/Blog";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">Blog App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Blogs</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
            </Nav>

            {user && (
              <>
                <Navbar.Text className="pe-2">
                  Signed in as: {user.name}
                </Navbar.Text>
                <Button variant="light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {notification && <Notification message={notification} />}

        <Routes>
          <Route path="/" element={!user ? <LoginForm /> : <BlogList />} />
          <Route
            path="/blogs/:blogId"
            element={!user ? <LoginForm /> : <Blog />}
          />
          <Route path="/users" element={!user ? <LoginForm /> : <Users />} />
          <Route
            path="/users/:userId"
            element={!user ? <LoginForm /> : <User />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
