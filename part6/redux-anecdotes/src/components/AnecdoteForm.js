import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // dispatch the action returned from addAnecdote
  const createAnecdote = (event) => {
    event.preventDefault();
    // get the input from an uncontrolled input accessible from the form
    let content = event.target.content.value;
    event.target.content.value = "";

    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
