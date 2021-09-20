import React, { useState } from 'react';

const StatisticLine = (props) => {
  let { text, value } = props;

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// a proper place to define a component
const Statistics = (props) => {
  let { good, neutral, bad } = props;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <StatisticLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tbody>
        </table>
      </div>
    );
  }
};

const Button = (props) => {
  let { updateStats } = props;
  let { stats } = props;

  return (
    <button
      onClick={() => {
        updateStats(stats.value, stats.setter);
      }}
    >
      {stats.type}
    </button>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateStats = (stats, setter) => {
    setter(stats + 1);
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button
          updateStats={updateStats}
          stats={{ value: good, setter: setGood, type: 'good' }}
        />
        <Button
          updateStats={updateStats}
          stats={{ value: neutral, setter: setNeutral, type: 'neutral' }}
        />
        <Button
          updateStats={updateStats}
          stats={{ value: bad, setter: setBad, type: 'bad' }}
        />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
