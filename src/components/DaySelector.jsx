const DAY_SHORT = {
  Monday: 'MON',
  Tuesday: 'TUE',
  Wednesday: 'WED',
  Thursday: 'THU',
  Friday: 'FRI',
  Saturday: 'SAT',
  Sunday: 'SUN',
}

export default function DaySelector({ days, selectedDay, onSelect, routines }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className="day-selector">
      {days.map(day => {
        const count = routines[day]?.length ?? 0
        const isToday = day === today
        const isSelected = day === selectedDay

        return (
          <button
            key={day}
            className={`day-btn ${isSelected ? 'active' : ''} ${isToday ? 'today' : ''}`}
            onClick={() => onSelect(day)}
          >
            <span className="day-short">{DAY_SHORT[day]}</span>
            <span className="day-full">{day}</span>
            {count > 0 && (
              <span className="exercise-count">{count}</span>
            )}
            {isToday && <span className="today-dot" />}
          </button>
        )
      })}
    </div>
  )
}
