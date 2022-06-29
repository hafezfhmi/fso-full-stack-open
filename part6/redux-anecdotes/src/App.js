import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  // get state from redux store and sort it by votes
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  // get dispatch function from react-redux
  const dispatch = useDispatch();

  // dispatch the action returned from addVote
  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
  };

  // dispatch the action returned from addAnecdote
  const createAnecdote = (event) => {
    event.preventDefault();
    // get the input from an uncontrolled input accessible from the form
    let content = event.target.content.value;
    event.target.content.value = "";

    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
