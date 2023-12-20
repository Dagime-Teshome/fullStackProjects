/* eslint-disable react/prop-types */
const PhonebookForm = ({
  name,
  number,
  numberChange,
  nameChange,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <p>
            <label>Name:</label>
            <input type="text" value={name} onChange={nameChange} />
          </p>
          <p>
            <label>Number:</label>
            <input type="tel" value={number} onChange={numberChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PhonebookForm;
