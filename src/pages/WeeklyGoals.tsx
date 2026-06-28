import PageHeader from '../components/PageHeader'
import type { GoalCardTypes } from '../types/types'

const GOAL_LIST: GoalCardTypes[] = [
  { id: 'g1', title: 'Read books', tag: 'personal', current: 3, target: 4, unit: 'sessions' },
  { id: 'g2', title: 'Deep work hours', tag: 'work', current: 3, target: 5, unit: 'hours' },
  { id: 'g3', title: 'Finish proposal', tag: 'work', current: 2, target: 5, unit: 'sections' },
  { id: 'g4', title: 'Workouts', tag: 'health', current: 4, target: 5, unit: 'days' },
  { id: 'g5', title: 'Meditate', tag: 'health', current: 6, target: 7, unit: 'days' },
  { id: 'g6', title: 'Inbox zero', tag: 'work', current: 5, target: 5, unit: 'days' },
]

function WeeklyGoals() {
  return (
    <>
      <PageHeader
        title="Weekly Goals"
        subtitle="Track the targets you set for this week."
        actionLabel="+ New Goal"
      />

      <section className="goal-grid">
        {GOAL_LIST.map(o => {
          // Compute the percentage once, clamp to 100 just in case.
          const percent = Math.min(100, Math.round((o.current / o.target) * 100))
          return (
            <article className="goal-card card" key={o.id}>
              <div className="goal-card__top">
                <span className={`tag tag--${o.tag}`}>{o.tag}</span>
                <span className="goal-card__percent">{percent}%</span>
              </div>

              <h3 className="goal-card__title">{o.title}</h3>
              <p className="goal-card__meta">
                {o.current} of {o.target} {o.unit}
              </p>

              <div className="goal__track">
                <div className="goal__fill" style={{ width: `${percent}%` }} />
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}

export default WeeklyGoals
