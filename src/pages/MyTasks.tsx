import PageHeader from '../components/PageHeader'
import NewTaskForm from '../components/NewTaskForm'
import type { StoredTaskTypes } from '../types/types'

import { useState, type ReactNode } from 'react'

const FILTERS = ['All', 'Active', 'Completed']
const STORAGE_KEY = 'focusdo.tasks' //LocalS torage Name

function readStoredTasks(): StoredTaskTypes[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredTaskTypes[]
    } catch { return [] }
}


//This is just a substitute
const TASK_LIST: StoredTaskTypes[] = [
    { id: 't1', name: 'Outline project proposal', completed: false, category: 'work', dueDate: 'Today', priority: 'High' },
]

export const Header = () => {

    const [isFormOpen, setFormOpen] = useState(false)

    function handleAddTask(data: Omit<StoredTaskTypes, 'id' | 'completed'>) {
        //Assign unique ID to the new task
        const newTask: StoredTaskTypes = {id: crypto.randomUUID(), ...data, completed: false}

        //Append the updated data to the fetched list of tasks
        const updated = [...readStoredTasks(), newTask]

        //Append the updated data to the local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

        //Close the form component
        setFormOpen(false)
    }

    return (
        <>
            <PageHeader
                title="My Tasks"
                subtitle="All your tasks in one place."
                actionLabel="+ New Task"
                onAction={() => setFormOpen(true)}/>

            {isFormOpen && <NewTaskForm onSubmit={handleAddTask} onCancel={() => setFormOpen(false)}/>}

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
                        <li className={`task-table__row ${o.completed ? 'task-table__row--done' : ''}`} key={o.id}>
                <span className="task-table__cell task-table__cell--main">
                    <input className="task__check" type="checkbox" defaultChecked={o.completed} />
                    {o.name}
                </span>
                <span className="task-table__cell">
                    {o.category && <span className={`tag tag--${o.category}`}>{o.category}</span>}
                </span>
                <span className="task-table__cell task-table__cell--muted">{o.dueDate}</span>
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
