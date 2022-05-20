import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateLikes = async (blogId, likes) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, { likes: likes });

  return response.data;
};

export default { getAll, addBlog, setToken, updateLikes };
