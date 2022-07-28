/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const addVote = async (id) => {
  const anecdoteToVote = await getAnecdote(id);
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: anecdoteToVote.votes + 1,
  });
  return response.data;
};

export default {
  getAnecdote,
  getAll,
  createNew,
  addVote,
};
