import { useEffect, useState } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'
import CountryView from './components/CountryView'

const ALL_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get(ALL_URL).then((response) => setCountries(response.data))
  }, [])

  const handleFilterChange = (value) => {
    setFilter(value)
    setSelected(null)
  }

  const query = filter.trim().toLowerCase()
  const matches =
    query === ''
      ? []
      : countries.filter((c) => c.name.common.toLowerCase().includes(query))

  const renderBody = () => {
    if (query === '') {
      return null
    }
    if (matches.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    if (matches.length > 1) {
      return (
        <>
          <CountryList countries={matches} onShow={setSelected} />
          {selected && <CountryView country={selected} />}
        </>
      )
    }
    if (matches.length === 1) {
      return <CountryView country={matches[0]} />
    }
    return <p>No matches</p>
  }

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        />
      </div>
      {renderBody()}
    </div>
  )
}

export default App
