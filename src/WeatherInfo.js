import DayForecast from './DayForecast'

export default function WeatherInfo({ forecast }) {


    return forecast !== undefined
        ? forecast.map(day => <DayForecast key={day.date} day={day.date} hourlyData={day.forecast}/>)
        : null
}