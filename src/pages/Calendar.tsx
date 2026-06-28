import PageHeader from '../components/PageHeader'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// May 2024 starts on a Wednesday, so we pad 3 empty cells before day 1.
const LEADING_BLANKS = 3
const DAYS_IN_MONTH = 31
const TODAY = 15

// Map of day -> list of event colors (by category) to show as dots.
const EVENTS: Record<number, string[]> = {
    6: ['work'],
    9: ['health', 'personal'],
    13: ['work', 'work'],
    15: ['work', 'health', 'personal'],
    17: ['personal'],
    21: ['health'],
    24: ['work'],
}

function Calendar() {
    const cells: (number | null)[] = [
        ...Array(LEADING_BLANKS).fill(null),
        ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
    ]

    return (
        <>
        <PageHeader
            title="Calendar"
            subtitle="Your month at a glance."
            actionLabel="+ New Event"
        />

        <article className="card calendar">
            <div className="calendar__bar">
            <button className="calendar__nav" type="button">‹</button>
            <h2 className="calendar__month">May 2024</h2>
            <button className="calendar__nav" type="button">›</button>
            </div>

            <div className="calendar__grid">
            {WEEKDAYS.map((d) => (
                <div className="calendar__weekday" key={d}>{d}</div>
            ))}

            {cells.map((day, index) => (
                <div
                // index is fine as a key here: the list is fixed and never reorders.
                key={index}
                className={`calendar__cell ${day === null ? 'calendar__cell--empty' : ''} ${day === TODAY ? 'calendar__cell--today' : ''}`}
                >
                {day && <span className="calendar__date">{day}</span>}
                {day && EVENTS[day] && (
                    <div className="calendar__dots">
                    {EVENTS[day].map((cat, i) => (
                        <span key={i} className={`calendar__dot calendar__dot--${cat}`} />
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>
        </article>
        </>
    )
}

export default Calendar
