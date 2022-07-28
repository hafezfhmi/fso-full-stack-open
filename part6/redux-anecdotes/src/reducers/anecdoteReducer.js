import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((currentState) =>
        currentState.id === action.payload.id ? action.payload : currentState
      );
    },
    addAnecdote(state, action) {
      let anecdote = action.payload;
      return [...state, anecdote];
    },
    setAnecdotes(state, action) {
      let anecdotes = action.payload;
      return anecdotes;
    },
  },
});

export const { updateAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch(addAnecdote(anecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.addVote(id);
    dispatch(updateAnecdote(anecdote));
  };
};

export default anecdoteSlice.reducer;
