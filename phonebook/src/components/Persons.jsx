const Persons = ({ persons, onDelete }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}{' '}
        <button type="button" onClick={() => onDelete(person)}>
          delete
        </button>
      </li>
    ))}
  </ul>
)

export default Persons
