import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    let loggedUser = window.localStorage.getItem('loggedUser');

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

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      handleNotification({ message: `Logged in` });
      setUsername('');
      setPassword('');
    } catch (error) {
      handleNotification({
        message: `wrong username or password`,
        type: 'danger',
      });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedUser');
    setUser(null);
    handleNotification({ message: `Logged out` });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      let newBlog = await blogService.addBlog({ title, author, url });
      setBlogs((latestBlogs) => latestBlogs.concat(newBlog));
      handleNotification({ message: `a new blog ${title} by ${author} added` });

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      handleNotification({
        message: `error creating new blog`,
        type: 'danger',
      });
    }
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const createNewForm = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  const blogList = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      {createNewForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const ErrorNotification = ({ message }) => (
    <p
      style={
        message.type === 'danger'
          ? {
              backgroundColor: '#f1f1f1',
              color: 'red',
              border: '2px solid red',
              padding: '5px',
            }
          : {
              backgroundColor: '#f1f1f1',
              color: 'green',
              border: '2px solid green',
              padding: '5px',
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
