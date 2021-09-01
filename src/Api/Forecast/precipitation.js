import createDataExpander from './expand-forecast-data'

const expandPrecipitationData = createDataExpander()

export default function hourlyPrecipitationChances(forecastData) {
    return expandPrecipitationData(forecastData.probabilityOfPrecipitation.values)
}