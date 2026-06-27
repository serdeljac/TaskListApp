
const CATEGORIES = [
    { label: 'Work', value: 57, color: '#6c5ce7' },
    { label: 'Personal', value: 24, color: '#f59e0b' },
    { label: 'Health', value: 19, color: '#22c55e' },
]

function buildDonut(): string {
    let start = 0
    const stops = CATEGORIES.map((c) => {
        const end = start + c.value
        const stop = `${c.color} ${start}% ${end}%`
        start = end
        return stop
    })
    return `conic-gradient(${stops.join(', ')})`
}

function ProgressReport() {
    return (
        <article className="card progress-report">
            <div className="card__header">
                <h2 className="card__title">Progress Report</h2>
                <span className="card__dropdown">This Week ▾</span>
            </div>

            <div className="progress-report__overall">
                <span className="progress-report__big">70%</span>
                <span className="progress-report__meta">14 of 20 tasks completed</span>
            </div>

            <svg className="chart" viewBox="0 0 300 90" preserveAspectRatio="none">
                <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
                </linearGradient>
                </defs>
                <path
                d="M0,70 C40,60 60,30 100,35 S180,15 220,40 S280,20 300,28 L300,90 L0,90 Z"
                fill="url(#areaFill)"
                />
                <path
                d="M0,70 C40,60 60,30 100,35 S180,15 220,40 S280,20 300,28"
                fill="none"
                stroke="#6c5ce7"
                strokeWidth="2.5"
                />
            </svg>

            <div className="breakdown">
                <h3 className="breakdown__title">Category Breakdown</h3>
                <div className="breakdown__body">
                <div className="donut" style={{ background: buildDonut() }}>
                    <div className="donut__hole">
                    <span className="donut__value">14</span>
                    <span className="donut__caption">Tasks</span>
                    </div>
                </div>

                <ul className="legend">
                    {CATEGORIES.map((c) => (
                    <li className="legend__item" key={c.label}>
                        <span className="legend__dot" style={{ background: c.color }} />
                        <span className="legend__label">{c.label}</span>
                        <span className="legend__value">{c.value}%</span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </article>
    )
}

export default ProgressReport
