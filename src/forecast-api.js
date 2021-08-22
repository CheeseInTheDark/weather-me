import { flatten, range, zipWith } from 'lodash'
import moment from 'moment'

export default async function getHourlyForecast() {
    const weatherResponse = await fetch('https://api.weather.gov/gridpoints/ILN/49,79')
    const body = await weatherResponse.text()
    const data = JSON.parse(body).properties

    const temperatures = hourlyTemperatures(data)
    const precipitationChances = hourlyPrecipitationChances(data)
    const windSpeeds = hourlyWindSpeeds(data)
    
    const hourlyWeatherData = zipWith(temperatures, precipitationChances, windSpeeds, toHourlyData)
    return truncate(hourlyWeatherData)
}

function truncate(data) {
    const endDate = moment().add(4, 'days')
    return data.filter(row => row.timestamp !== undefined && row.timestamp.isBefore(endDate))
}

function toHourlyData(temperature, precipitationChance, windSpeed) {
    return { 
        timestamp: temperature?.timestamp, 
        temperature: temperature?.value,
        precipitationChance: precipitationChance?.value,
        windSpeed: windSpeed?.value
    }
}

function hourlyTemperatures(forecastData) {
    const sparseTemperatureData = forecastData.temperature.values
    const expandedTemperatures = sparseTemperatureData.map(toHourlyTemperatures)

    return flatten(expandedTemperatures)
}

function toHourlyTemperatures(temperature) {
    const fahrenheitValue = convertCtoF(temperature.value)

    return expandToHourly(fahrenheitValue, temperature.validTime)
}

function hourlyPrecipitationChances(forecastData) {
    const sparsePrecipitationData = forecastData.probabilityOfPrecipitation.values
    const expandedPrecipitationChances = sparsePrecipitationData.map(toHourlyPrecipitationChances)

    return flatten(expandedPrecipitationChances)
}

function toHourlyPrecipitationChances(precipitationChance) {
    return expandToHourly(precipitationChance.value, precipitationChance.validTime)
}

function hourlyWindSpeeds(forecastData) {
    const sparseWindSpeedData = forecastData.windSpeed.values
    const expandedWindSpeeds = sparseWindSpeedData.map(toHourlyWindSpeeds)

    return flatten(expandedWindSpeeds)
}

function toHourlyWindSpeeds(windSpeed) {
    const windSpeedInMPH = convertKPHtoMPH(windSpeed.value)

    return expandToHourly(windSpeedInMPH, windSpeed.validTime)
}

function expandToHourly(value, timeString) {
    const [timestamp, durationInHoursString] = timeString.split("/PT")
    
    const durationInHours = Number(durationInHoursString.split("H")[0])
    const startTime = moment(timestamp)

    const expandedHours = range(0, durationInHours)
    return expandedHours.map(hourOffset => ({
        value,
        timestamp: startTime.clone().add(hourOffset, 'hour')
    }))
}

function convertCtoF(celsius) {
    const ratio = 9/5

    return (celsius * ratio) + 32
}

function convertKPHtoMPH(speedInKPH) {
    return speedInKPH / 1.609344
}
