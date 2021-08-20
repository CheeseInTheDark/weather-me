import DayHeader from "./DayHeader";
import HourForecast from './HourForecast';

export default function DayForecast({ day, hourlyData }) {
    return <>
        <DayHeader day={day}/>
        {hourlyData.map(data => <HourForecast hourlyData={data}/>)}
    </>
}

