import { groupBy } from 'lodash'
import DayForecast from './DayForecast'

export default function WeatherInfo({ forecast }) {

    const hourlyDataByDay = groupBy(forecast, dayForHour)

    const days = Object.keys(hourlyDataByDay)

    console.log("WHAHH", hourlyDataByDay)

    return forecast !== undefined
        ? days.map(day => <DayForecast day={day} hourlyData={hourlyDataByDay[day]}/>)
        : null
    // return null
}

function dayForHour(forecastForHour) {
    return forecastForHour.timestamp.clone().startOf('day').format('dddd')
}