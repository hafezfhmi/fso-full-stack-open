import axios from 'axios';
// Since we are going to copy it to backend folder, base url can be relative url(same folder structure).
// In dev mode, we added proxy to package.json for it to work as usual.
const baseURL = '/api/persons';

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
