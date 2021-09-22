import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const addPerson = (newPhoneNumber) => {
  return axios.post(baseURL, newPhoneNumber).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const updatePerson = (id, updatedData) => {
  return axios
    .put(`${baseURL}/${id}`, updatedData)
    .then((response) => response.data);
};

const phonebookServices = {
  getAll,
  addPerson,
  deletePerson,
  updatePerson,
};

export default phonebookServices;
