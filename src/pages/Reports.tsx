import PageHeader from '../components/PageHeader'

// Bars for a simple "tasks completed per day" chart, as percentages of the tallest.
const WEEK_BARS = [
    { day: 'Mon', value: 60 },
    { day: 'Tue', value: 85 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 30 },
    { day: 'Sun', value: 50 },
]

const SUMMARY = [
    { label: 'Completion Rate', value: '70%' },
    { label: 'Tasks Done', value: '48' },
    { label: 'Avg / Day', value: '6.8' },
    { label: 'Best Streak', value: '12d' },
]

function Reports() {
    return (
        <>
        <PageHeader
            title="Reports"
            subtitle="How your productivity is trending."
            actionLabel="Export"
        />

        <section className="report-summary">
            {SUMMARY.map((s) => (
            <div className="summary-tile card" key={s.label}>
                <span className="summary-tile__value">{s.value}</span>
                <span className="summary-tile__label">{s.label}</span>
            </div>
            ))}
        </section>

        <section className="report-grid">
            <article className="card">
            <div className="card__header">
                <h2 className="card__title">Tasks Completed</h2>
                <span className="card__dropdown">This Week ▾</span>
            </div>

            {/* A pure-CSS bar chart: each bar's height is set inline from its value. */}
            <div className="bar-chart">
                {WEEK_BARS.map((b) => (
                <div className="bar-chart__col" key={b.day}>
                    <div className="bar-chart__bar" style={{ height: `${b.value}%` }} />
                    <span className="bar-chart__label">{b.day}</span>
                </div>
                ))}
            </div>
            </article>

            <article className="card">
            <div className="card__header">
                <h2 className="card__title">Time by Category</h2>
            </div>
            <div className="breakdown__body">
                <div
                className="donut"
                style={{ background: 'conic-gradient(#6c5ce7 0% 57%, #f59e0b 57% 81%, #22c55e 81% 100%)' }}
                >
                <div className="donut__hole">
                    <span className="donut__value">42h</span>
                    <span className="donut__caption">total</span>
                </div>
                </div>
                <ul className="legend">
                <li className="legend__item"><span className="legend__dot" style={{ background: '#6c5ce7' }} /><span className="legend__label">Work</span><span className="legend__value">57%</span></li>
                <li className="legend__item"><span className="legend__dot" style={{ background: '#f59e0b' }} /><span className="legend__label">Personal</span><span className="legend__value">24%</span></li>
                <li className="legend__item"><span className="legend__dot" style={{ background: '#22c55e' }} /><span className="legend__label">Health</span><span className="legend__value">19%</span></li>
                </ul>
            </div>
            </article>
        </section>
        </>
    )
    }

    export default Reports
