import { useDispatch } from "react-redux";
import { createAnecdotes } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // dispatch the action returned from addAnecdote
  const createAnecdote = async (event) => {
    event.preventDefault();
    // get the input from an uncontrolled input accessible from the form
    let content = event.target.content.value;
    event.target.content.value = "";

    dispatch(createAnecdotes(content));

    dispatch(displayNotification(`you added ${content}`, 5000));
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
