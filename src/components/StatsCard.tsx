//When using props, declare the name of each one in the properties of a function
//Use interface <propName> to declare the types of each prop [TypeScript]
import type {StatCardTypes} from '../types/types' 

function StatsCard({icon, label, value, hint, accent = '#6c5ce7'}: StatCardTypes) {
    return (
        <div className="stat-card">
        <span className="stat-card__icon" style={{ background: accent }}>
            {icon}
        </span>
        <div className="stat-card__body">
            <span className="stat-card__value">{value}</span>
            <span className="stat-card__label">{label}</span>
            {hint && <span className="stat-card__hint">{hint}</span>}
        </div>
        </div>
    )
}

export default StatsCard