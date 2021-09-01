import createDataExpander from './expand-forecast-data'

const expandWindData = createDataExpander(convertKPHtoMPH)

export default function hourlyWindSpeeds(forecastData) {
    return expandWindData(forecastData.windSpeed.values)
}

function convertKPHtoMPH(speedInKPH) {
    return speedInKPH / 1.609344
}