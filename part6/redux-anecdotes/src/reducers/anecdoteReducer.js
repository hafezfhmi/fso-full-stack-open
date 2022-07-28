import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map((currentState) =>
        currentState.id === action.payload
          ? { ...currentState, votes: currentState.votes + 1 }
          : currentState
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

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
