import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const add = (newPhoneNumber) => {
  return axios.post(baseURL, newPhoneNumber).then((response) => response.data);
};

const phonebookServices = {
  getAll,
  add,
};

export default phonebookServices;
