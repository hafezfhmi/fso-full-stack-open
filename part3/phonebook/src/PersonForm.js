import React from 'react';

const PersonForm = ({
  getName,
  newName,
  getNumber,
  newNumber,
  submitInput,
}) => {
  return (
    <form>
      <h2>add a new</h2>
      <div>
        name: <input onChange={getName} value={newName} />
      </div>
      <div>
        number: <input type="number" onChange={getNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={submitInput}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
