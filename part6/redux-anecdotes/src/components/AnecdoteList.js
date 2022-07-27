import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  // get state from redux store and sort it by votes
  const anecdotes = useSelector((state) => {
    return state.anecdote;
  });

  // get dispatch function from react-redux
  const dispatch = useDispatch();

  // dispatch the action returned from addVote
  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));

    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(setNotification(`you voted ${votedAnecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
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
