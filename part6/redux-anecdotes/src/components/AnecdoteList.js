import { useEffect } from "react";
import { connect } from "react-redux";
import { addVote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  // get dispatch function from react-redux

  const initializeAnecdotes = props.initializeAnecdotes;

  useEffect(() => {
    initializeAnecdotes();
  }, [initializeAnecdotes]);

  // dispatch the action returned from addVote
  const vote = (id) => {
    props.addVote(id);

    const votedAnecdote = props.anecdotes.find(
      (anecdote) => anecdote.id === id
    );

    props.displayNotification(`you voted ${votedAnecdote.content}`, 5000);
  };

  const sortedAnecdotes = [...props.anecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.includes(props.filter)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, {
  addVote,
  initializeAnecdotes,
  displayNotification,
})(AnecdoteList);
