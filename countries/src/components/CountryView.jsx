import Weather from './Weather'

const CountryView = ({ country }) => {
  const langs = country.languages ? Object.values(country.languages) : []

  return (
    <div className="country-block">
      <h2>{country.name.common}</h2>
      <p>capital {country.capital?.join(', ') ?? '—'}</p>
      <p>area {country.area}</p>
      <div>
        <h3>languages</h3>
        <ul>
          {langs.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        width={160}
      />
      <Weather country={country} />
    </div>
  )
}

export default CountryView
