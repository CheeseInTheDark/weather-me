import moment from 'moment'
import { range } from 'lodash'

export default function expandToHourly(value, timeString) {
    const [timestamp, durationString] = timeString.split("/")
    
    const durationInHours = moment.duration(durationString).hours()
    const startTime = moment(timestamp)

    const hoursRange = range(0, durationInHours)
    const expandedData = hoursRange.map(hourOffset => ({
        value,
        timestamp: startTime.clone().add(hourOffset, 'hour')
    }))

    return expandedData
}
