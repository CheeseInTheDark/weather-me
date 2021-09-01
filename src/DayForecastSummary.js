import { pick } from 'lodash'

export default function DayForecastSummary({ hourlyData }) {
    const temperatures = hourlyData.map(hour => hour.temperature)
    console.log(temperatures)

    const highTemperature = Math.max(...temperatures)
    const lowTemperature = Math.min(...temperatures)

    return <div>
        <div>High {highTemperature}</div>
        <div>Low {lowTemperature}</div>
    </div>
}