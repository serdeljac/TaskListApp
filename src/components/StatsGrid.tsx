import StatCard from './StatsCard.tsx'

const STAT_CARD_INFO = [
    { icon: '🎯', label: 'Weekly Goals', value: '3', accent: '#6c5ce7' },
    { icon: '✅', label: 'Tasks Completed', value: '14', hint: 'of 20 this week', accent: '#22c55e' },
    { icon: '⏳', label: 'Tasks Pending', value: '6', accent: '#f59e0b' },
    { icon: '🔥', label: 'Current Streak', value: '7', hint: 'days in a row', accent: '#ef4444' },
]


function StatsGrid() {
    return (
        <section className="stats-grid">
            {STAT_CARD_INFO.map(o => (
                <StatCard key={o.label} icon={o.icon} label={o.label} value={o.value} hint={o.hint} accent={o.accent}/> 
            ))}
        </section>
    )
}

export default StatsGrid