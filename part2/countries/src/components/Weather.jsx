import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [data, setData] = useState(null)
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (!apiKey || !country?.latlng || country.latlng.length < 2) {
      setData(null)
      return undefined
    }

    const [lat, lon] = country.latlng
    let cancelled = false

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: apiKey,
        },
      })
      .then((response) => {
        if (!cancelled) {
          setData(response.data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [country, apiKey])

  if (!apiKey) {
    return (
      <p className="weather">
        Add <code>VITE_SOME_KEY</code> to a <code>.env</code> file
        (see <code>.env.example</code>) and restart the dev server for weather
        (exercise 2.20).
      </p>
    )
  }

  if (!data) {
    return null
  }

  const w = data.weather[0]
  const iconUrl = `https://openweathermap.org/img/wn/${w.icon}@2x.png`
  const capital = country.capital?.[0] ?? 'capital'

  return (
    <div className="weather">
      <h3>Weather in {capital}</h3>
      <p>temperature {data.main.temp} Celsius</p>
      <img src={iconUrl} alt={w.description} />
      <p>wind {data.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
