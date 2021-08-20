import './HourForecast.css'

export default function HourForecast({ hourlyData }) {
    
    const hourString = toHourString(hourlyData)
    const temperature = toTemperature(hourlyData)
    const precipitation = toPrecipitation(hourlyData)

    return <div className="forecastHourRow">
        <span className="hourDisplay">{hourString}</span>
        <span className="temperature">{temperature}</span>
        <span className="precipitation">{precipitation}</span>
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