import type { TaskTypes } from '../types/types'

const TASKS: TaskTypes[] = [
    { id: 't1', text: 'Outline project proposal', done: false, tag: 'work' },
    { id: 't2', text: 'Morning workout', done: true, tag: 'health' },
    { id: 't3', text: 'Reply to emails', done: false, tag: 'work' },
    { id: 't4', text: 'Read chapter 4', done: false, tag: 'personal' },
]

function TasksForToday() {
    return (
        <article className="card tasks-today">
        <div className="card__header">
            <h2 className="card__title">Tasks for Today</h2>
            <a className="card__action" href="#">View all</a>
        </div>

        <ul className="task-list">
            {TASKS.map((task) => (
            <li className={`task ${task.done ? 'task--done' : ''}`} key={task.id}>
                <input className="task__check" type="checkbox" defaultChecked={task.done} />
                <span className="task__text">{task.text}</span>
                {task.tag && <span className={`tag tag--${task.tag}`}>{task.tag}</span>}
            </li>
            ))}
        </ul>

        <button className="task-add" type="button">+ Add Task</button>
        </article>
    )
}

export default TasksForToday
