import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import anecdotesServices from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // dispatch the action returned from addAnecdote
  const createAnecdote = async (event) => {
    event.preventDefault();
    // get the input from an uncontrolled input accessible from the form
    let content = event.target.content.value;
    event.target.content.value = "";

    let anecdote = await anecdotesServices.createNew(content);

    dispatch(addAnecdote(anecdote));

    dispatch(setNotification(`you added ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
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

export default AnecdoteForm;
