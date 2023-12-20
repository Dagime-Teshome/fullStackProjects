/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  let total = parts.reduce((total, part) => {
    return (total += part.exercises);
  }, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Total;
