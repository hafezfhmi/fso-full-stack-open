const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((curr) => (
        <Part part={curr.name} exercise={curr.exercises} key={curr.id} />
      ))}
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p>
        <b>
          total of{' '}
          {parts.reduce((acc, curr) => {
            return (acc += curr.exercises);
          }, 0)}{' '}
          exercises
        </b>
      </p>
    </>
  );
};

export default Course;
