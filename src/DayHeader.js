export default function DayHeader({ day, onClick }) {
    const formattedDate = day.format("dddd")
  
    return <div className="header" onClick={onClick}>{formattedDate}</div>
}