import './HourForecast.css'

const useDefaultLocale = undefined
const formatWindSpeed = new Intl.NumberFormat(useDefaultLocale, { maximumFractionDigits: 0 }).format

export default function HourForecast({ weatherData }) {
    
    const hourString = toHourString(weatherData)
    const temperature = toTemperature(weatherData)
    const precipitation = toPrecipitation(weatherData)
    const windSpeed = toWindSpeed(weatherData)

    return <div className="forecastHourRow">
        <span className="hourDisplay">{hourString}</span>
        <span className="forecastItem">{temperature}</span>
        <span className="forecastItem">{precipitation}</span>
        <span className="forecastItem">{windSpeed}</span>
    </div>
}

function toHourString(row) {
    return row.timestamp.clone().format('h A')
}

function toTemperature(row) {
    return `${row.temperature} F`
}

function toPrecipitation(row) {
    return `${row.precipitationChance}%`
}

function toWindSpeed(row) {
    return formatWindSpeed(row.windSpeed)
}

function textColor(minValue, maxValue, startColor, endColor) {
    
}