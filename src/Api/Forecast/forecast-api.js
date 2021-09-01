import { zipWith } from 'lodash'
import moment from 'moment'

import hourlyTemperatures from './temperature'
import hourlyPrecipitationChances from './precipitation'
import hourlyWindSpeeds from './wind-speed'
import { groupBy, values } from 'lodash'

export default async function getForecast() {
    const weatherResponse = await fetch('https://api.weather.gov/gridpoints/ILN/49,79')
    const body = await weatherResponse.text()
    const data = JSON.parse(body).properties

    const temperatures = hourlyTemperatures(data)
    const precipitationChances = hourlyPrecipitationChances(data)
    const windSpeeds = hourlyWindSpeeds(data)

    const hourlyWeatherData = zipWith(temperatures, precipitationChances, windSpeeds, toHourlyData)
    const truncatedData = truncate(hourlyWeatherData)
    return groupByDay(truncatedData)
}

function truncate(data) {
    return data.filter(row => !values(row).some(value => value === undefined))
}

function toHourlyData(temperature, precipitationChance, windSpeed) {
    return { 
        timestamp: temperature?.timestamp, 
        temperature: temperature?.value,
        precipitationChance: precipitationChance?.value,
        windSpeed: windSpeed?.value
    }
}

function groupByDay(forecastData) {
    const forecastByDay = groupBy(forecastData, dayForHour)
    const days = Object.keys(forecastByDay)

    return days.map(day => ({
        date: moment(day),
        forecast: forecastByDay[day]
    }))
}

function dayForHour(forecastForHour) {
    return forecastForHour.timestamp.clone().startOf('day')
}
