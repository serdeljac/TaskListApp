import PageHeader from '../components/PageHeader'
import NewTaskForm from '../components/NewTaskForm'

import type { TaskTypes } from '../types/types'
import { useState, type ReactNode } from 'react'

const FILTERS = ['All', 'Active', 'Completed']

//This grabs the types from the file and adds new ones
interface TaskRow extends TaskTypes {
    due: string
    priority: 'High' | 'Medium' | 'Low'
}

//This is just a substitute
const TASK_LIST: TaskRow[] = [
    { id: 't1', text: 'Outline project proposal', done: false, tag: 'work', due: 'Today', priority: 'High' },
    // { id: 't2', text: 'Morning workout', done: true, tag: 'health', due: 'Today', priority: 'Medium' },
    // { id: 't3', text: 'Reply to client emails', done: false, tag: 'work', due: 'Tomorrow', priority: 'High' },
    // { id: 't4', text: 'Read chapter 4', done: false, tag: 'personal', due: 'May 18', priority: 'Low' },
    // { id: 't5', text: 'Plan weekend trip', done: false, tag: 'personal', due: 'May 19', priority: 'Low' },
    // { id: 't6', text: 'Team retro notes', done: true, tag: 'work', due: 'Yesterday', priority: 'Medium' },
]

export const Header = () => {

    //Variables
   const [isFormOpen, setFormOpen] = useState(false)

    return (
        <>
            <PageHeader
                title="My Tasks"
                subtitle="All your tasks in one place."
                actionLabel="+ New Task"
                onAction={() => setFormOpen(true)}/>

            {isFormOpen && <NewTaskForm onCancel={() => setFormOpen(false)}/>}

            <div className="filter-bar">
                {FILTERS.map((f, i) => (
                <button key={f} type="button" className={`chip ${i === 0 ? 'chip--active' : ''}`}>
                    {f}
                </button>
                ))}
            </div>
            
        </>
    )
}

export const TaskTable = () => {
    const blankList = <li className="task-table__row noTasks">Nothing to Display</li>
    const resultsHTML: ReactNode = TASK_LIST.length === 0 ? blankList : getList()

    return (
        <>
            <article className="card">
                <ul className="task-table">
                <li className="task-table__head">
                    <span>Task</span>
                    <span>Category</span>
                    <span>Due</span>
                    <span>Priority</span>
                </li>
                {resultsHTML}
                </ul>
            </article>
        </>
    )
}

function getList() {
    return (
        <>
            {TASK_LIST.map((o) => (
                        <li className={`task-table__row ${o.done ? 'task-table__row--done' : ''}`} key={o.id}>
                <span className="task-table__cell task-table__cell--main">
                    <input className="task__check" type="checkbox" defaultChecked={o.done} />
                    {o.text}
                </span>
                <span className="task-table__cell">
                    {o.tag && <span className={`tag tag--${o.tag}`}>{o.tag}</span>}
                </span>
                <span className="task-table__cell task-table__cell--muted">{o.due}</span>
                <span className="task-table__cell">
                    <span className={`priority priority--${o.priority.toLowerCase()}`}>{o.priority}</span>
                </span>
                </li>
            ))}
        </>
    )
}



function Assembly() {
    return (
        <>
            <Header />
            <TaskTable />
        </>
    )
}

export default Assembly
