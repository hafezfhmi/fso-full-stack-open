const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// action creator
export const addVote = (id) => {
  return {
    type: "ADD VOTE",
    data: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "ADD ANECDOTE",
    data: { content },
  };
};

const initialState = anecdotesAtStart.map(asObject);

// reducer
const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    // ADD VOTE modify the state using map to increase votes and return the new state
    case "ADD VOTE":
      return state.map((currentState) =>
        currentState.id === action.data.id
          ? { ...currentState, votes: currentState.votes + 1 }
          : currentState
      );

    // ADD ANECDOTE add new anecdotes to state using spread operator
    case "ADD ANECDOTE":
      let anecdote = asObject(action.data.content);
      return [...state, anecdote];

    default:
      return state;
  }
};

export default reducer;
