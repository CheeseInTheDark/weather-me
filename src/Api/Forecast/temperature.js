import createDataExpander from './expand-forecast-data'

const expandTemperatureData = createDataExpander(convertCtoF)

export default function hourlyTemperatures(forecastData) {
    return expandTemperatureData(forecastData.temperature.values)
}

function convertCtoF(celsius) {
    const ratio = 9/5

    return (celsius * ratio) + 32
}