/* eslint-disable react/prop-types */
const NameFilter = ({ filterChange }) => {
  return (
    <>
      <input type="text" onChange={filterChange} />
    </>
  );
};

export default NameFilter;
