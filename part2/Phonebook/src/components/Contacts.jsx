/* eslint-disable react/prop-types */
const Contacts = ({ person, deleteClick }) => {
  return (
    <>
      <p>
        Name:
        <b>
          {person.name} {person.number}
        </b>
        <button
          onClick={() => {
            deleteClick(person.id);
          }}
        >
          Delete
        </button>
      </p>
    </>
  );
};

export default Contacts;
