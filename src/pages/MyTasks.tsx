import PageHeader from '../components/PageHeader'
import NewTaskForm from '../components/NewTaskForm'
import type { StoredTaskTypes } from '../types/types'

import { useState, type ReactNode } from 'react'

const FILTERS = ['All', 'Active', 'Completed']
const STORAGE_KEY = 'focusdo.tasks' //Local Storage Name
function storedToRow(task: StoredTaskTypes): StoredTaskTypes {
    return {
        id: task.id,
        name: task.name,
        completed: task.completed,
        category: task.category.toLowerCase(), // category strings match our tag names
        dueDate: task.dueDate,
        priority: task.priority,
    }
}

function readStoredTasks(): StoredTaskTypes[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredTaskTypes[]
    } catch { return [] }
}

export const TaskTable = ({ myTaskList }: { myTaskList: StoredTaskTypes[] }) => {
    const blankList = <li className="task-table__row noTasks">Nothing to Display</li>
    const resultsHTML: ReactNode = myTaskList.length === 0 ? blankList : getList(myTaskList)

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

function getList(myTaskList: StoredTaskTypes[]) {
    return (
        <>
            {myTaskList.map((o) => (
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
                    <span className={`priority priority--${o.priority}`}>{o.priority}</span>
                </span>
                </li>
            ))}
        </>
    )
}



function Assembly() {

    const [isFormOpen, setFormOpen] = useState(false)

    const [TASKS, setTasks] = useState<StoredTaskTypes[]>(() => [...readStoredTasks().map(storedToRow)])

    function handleAddTask(data: Omit<StoredTaskTypes, 'id' | 'completed'>) {
        //Assign unique ID to the new task
        const newTask: StoredTaskTypes = {id: crypto.randomUUID(), ...data, completed: false}

        //Append the updated data to the fetched list of tasks
        const updated = [...readStoredTasks(), newTask]

        //Append the updated data to the local storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

        setTasks((e) => [...e, storedToRow(newTask)]) //Update the state with the new task


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

            {isFormOpen && <NewTaskForm onSubmit={handleAddTask} onCancelFunc={() => setFormOpen(false)}/>}

            <div className="filter-bar">
                {FILTERS.map((f, i) => (
                <button key={f} type="button" className={`chip ${i === 0 ? 'chip--active' : ''}`}>
                    {f}
                </button>
                ))}
            </div> 

            <TaskTable myTaskList={TASKS}/>
        </>
    )
}

export default Assembly
