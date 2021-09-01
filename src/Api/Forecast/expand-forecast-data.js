import expandToHourly from "./expand-hourly-data"

import { flatten } from 'lodash'

export default function expandForecastData(valueFormatter = value => value) {
    function toHourlyData(sparseForecastValues) {
        const expandedTemperatures = sparseForecastValues.map(convertAndExpand)
    
        return flatten(expandedTemperatures)
    }

    function convertAndExpand(forecastDataPoint) {
        const formattedValue = valueFormatter(forecastDataPoint.value)

        return expandToHourly(formattedValue, forecastDataPoint.validTime)
    }

    return toHourlyData
}