const CountryList = ({ countries, onShow }) => (
  <ul>
    {countries.map((c) => (
      <li key={c.cca3}>
        {c.name.common}{' '}
        <button type="button" onClick={() => onShow(c)}>
          show
        </button>
      </li>
    ))}
  </ul>
)

export default CountryList
