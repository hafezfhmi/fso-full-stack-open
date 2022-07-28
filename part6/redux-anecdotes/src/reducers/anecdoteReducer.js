import { createSlice } from "@reduxjs/toolkit";

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

export default anecdoteSlice.reducer;
