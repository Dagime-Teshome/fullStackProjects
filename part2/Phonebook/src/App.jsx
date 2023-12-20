import { useEffect, useState } from "react";
import Contacts from "./components/Contacts";
import PhonebookForm from "./components/PhonebookForm";
import NameFilter from "./components/NameFilter";
import personService from "./Services/persons";
import Notifications from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsCopy, setPersonsCopy] = useState([]);
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [newNumber, setNewNumber] = useState(0);

  useEffect(() => {
    personService.getAll("http://localhost:3001/persons").then((response) => {
      setPersons(response);
      setPersonsCopy(response);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (confirm(`${newName} number is about to be changed`)) {
        const obj = persons.find((person) => {
          return person.name === newName;
        });
        const newObj = { ...obj, number: newNumber };
        personService
          .update(obj.id, newObj)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id == response.id ? response : person
              )
            );
            setPersonsCopy(
              persons.map((person) =>
                person.id == response.id ? response : person
              )
            );
            setMessage(`Person ${response.name} number updated successfully`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((e) => {
            setError(true);
            setMessage(`${e}`);
            setTimeout(() => {
              setMessage(null);
              setError(false);
            }, 5000);
          });
      }
    } else {
      let nameObj = {
        name: newName,
        number: newNumber,
      };

      personService.create(nameObj).then((response) => {
        setPersonsCopy([...persons, response]);
        setPersons([...persons, response]);
        setNewName("");
        setNewNumber(0);
        setMessage(`Person ${response.name} created successfully`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const handleFilter = (e) => {
    setPersons(
      personsCopy.filter((person) => {
        return person.name.includes(e.target.value);
      })
    );
  };
  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage(`Person Deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((e) => {
        setMessage(`${e} \n person not deleted`);
        setError(true);
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000);
      });
  };
  return (
    <div>
      <Notifications message={message} error={error} />
      <h2>Search</h2>
      <NameFilter filterChange={handleFilter} />
      <h2>Phone-book</h2>
      <PhonebookForm
        name={newName}
        number={newNumber}
        numberChange={handleNumberChange}
        nameChange={handleNameChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <Contacts
            key={person.id}
            person={person}
            deleteClick={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default App;
