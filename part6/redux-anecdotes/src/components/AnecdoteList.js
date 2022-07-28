import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  // get dispatch function from react-redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  // get state from redux store and sort it by votes
  const anecdotes = useSelector((state) => {
    return state.anecdote;
  });

  const filter = useSelector((state) => {
    return state.filter;
  });

  // dispatch the action returned from addVote
  const vote = (id) => {
    dispatch(addVote(id));

    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(displayNotification(`you voted ${votedAnecdote.content}`, 5000));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  );

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
