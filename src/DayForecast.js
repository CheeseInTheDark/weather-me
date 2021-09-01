import { useState } from "react";
import DayHeader from "./DayHeader";
import HourForecast from './HourForecast';
import DayForecastSummary from './DayForecastSummary'

export default function DayForecast({ day, hourlyData }) {

    const [expanded, setExpanded] = useState(true)

    function toggleExpanded() {
        setExpanded(!expanded)
    }

    return <>
        <DayHeader day={day} expanded={expanded} onClick={toggleExpanded}/>
        {!expanded && <DayForecastSummary hourlyData={hourlyData} />}
        {expanded && hourlyData.map(data => <HourForecast weatherData={data}/>)}
    </>
}

