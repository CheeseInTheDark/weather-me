export default function DayHeader({ day }) {
    const formattedDate = day.format("dddd")

    return <div className="header">{formattedDate}</div>
}