import type {GoalTypes} from '../types/types'

const WEEKLY_GOALS_LIST: GoalTypes[] = [
    { id: 'g1', text: 'Read 4 times this week', progress: 75 },
    { id: 'g2', text: 'Read for 5 hours', progress: 60 },
    { id: 'g3', text: 'Finish project proposal', progress: 40 },
]

function WeeklyGoals() {
    return (
        <article className="card weekly-goals">
        <div className="card__header">
            <h2 className="card__title">Weekly Goals</h2>
            <a className="card__action" href="#">View all</a>
        </div>

        <ul className="goal-list">
            {WEEKLY_GOALS_LIST.map(o => (
                <li className="goal" key={o.id}>
                    <div className="goal__top">
                    <span className="goal__text">{o.text}</span>
                    <span className="goal__percent">{o.progress}%</span>
                    </div>
                    <div className="goal__track">
                    <div className="goal__fill" style={{ width: `${o.progress}%` }} />
                    </div>
                </li>
            ))}
        </ul>
        </article>
    )
}

export default WeeklyGoals