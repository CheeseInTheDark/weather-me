import './App.css'
import { useEffect, useState } from 'react'
import WeatherInfo from './WeatherInfo'
import getForecast from './Api/forecast-api'

function App() {

  const [weatherData, setWeatherData] = useState()

  useEffect(() => { getWeather() }, [])

  async function getWeather() {
    const hourlyForecast = await getForecast()
    setWeatherData(hourlyForecast)
  }

  return (
    <div className="App">
      <WeatherInfo forecast={weatherData} />
    </div>
  )
}

export default App
