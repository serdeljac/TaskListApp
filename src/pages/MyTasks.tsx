import PageHeader from '../components/PageHeader'
import NewTaskForm from '../components/NewTaskForm'
import type { StoredTaskTypes, TaskFilterTypes } from '../types/types'
import { useState, type ReactNode } from 'react'
const STORAGE_KEY = 'focusdo.tasks'
const FILTERS: TaskFilterTypes['filter'][] = ['All', 'Active', 'Completed']


//This is the array that should be used in the list of tasks
function storedToRow(task: StoredTaskTypes): StoredTaskTypes {
    return {
        id: task.id,
        name: task.name,
        completed: task.completed,
        category: task.category.toLowerCase(),
        dueDate: task.dueDate,
        priority: task.priority,
    }
}

//This is used to GET the stored tasks
function getLocalStorageTasks(): StoredTaskTypes[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredTaskTypes[]
    } catch { 
        return [] 
    }
}

//This is used to APPEND the stored tasks
function appendLocalStorageTasks(tasklist: StoredTaskTypes[]) {
    const LIST_TO_APPEND = JSON.stringify(tasklist)
    localStorage.setItem(STORAGE_KEY, LIST_TO_APPEND)
}




/****************************************************************************** */
// ASSEMBLY
/****************************************************************************** */

function Assembly() {

    const [isFormOpen, setFormOpen] = useState(false)
    const [filter, setFilter] = useState<TaskFilterTypes['filter']>('All')
    const [TASKS, setTasks] = useState<StoredTaskTypes[]>(() => [...getLocalStorageTasks().map(storedToRow)])
    const blankList = <li className="task-table__row noTasks">Nothing to Display</li>
    const resultsHTML: ReactNode = TASKS.length === 0 ? blankList : null

    const FINAL_TASK_LIST = TASKS.filter((o) => {
        if (filter === 'Active') return !o.completed
        if (filter === 'Completed') return o.completed
        return true
    })

    function handleAddTask(data: Omit<StoredTaskTypes, 'id' | 'completed'>) {
        //Assign unique ID to the new task
        const newTask: StoredTaskTypes = {id: crypto.randomUUID(), ...data, completed: false}

        //Append the updated data to the local storage
        appendLocalStorageTasks([...getLocalStorageTasks(), newTask])

        setTasks((e) => [...e, storedToRow(newTask)]) //Update the state with the new task

        //Close the form component
        setFormOpen(false)
    }

    function handleToggleTask(id: string) {
        //Get the current list that is appended and switch its completed boolean value
        setTasks((prev) => 
            prev.map((TASKS) => 
                (TASKS.id === id ? {...TASKS, completed: !TASKS.completed} : TASKS)
            )
        )

        //Pull data from the Local Storage and switch the completed value
        const updated = getLocalStorageTasks().map((o) => 
            o.id === id ? {...o, completed: !o.completed} : o)
        appendLocalStorageTasks(updated) //Update the Local Storage with the new data
    }

    function removeTask(id: string) {
        const updatedList = TASKS.filter((o) => o.id !== id)
        setTasks(() => updatedList)
        appendLocalStorageTasks(updatedList)
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
                {FILTERS.map((o) => (
                <button 
                    key={o} 
                    type="button" 
                    className={`chip ${filter === o ? 'chip--active' : ''}`}
                    onClick={() => setFilter(o)}
                    >
                    {o}
                </button>
                ))}
            </div>

            <article className="card">
                <ul className="task-table">
                <li className="task-table__head">
                    <span>Task</span>
                    <span>Category</span>
                    <span>Due</span>
                    <span>Priority</span>
                </li>
                {resultsHTML}
                {FINAL_TASK_LIST.map((o) => (
                    <li className={`task-table__row ${o.completed ? 'task-table__row--done' : ''}`} key={o.id}>
                <span className="task-table__cell task-table__cell--main">
                    <input
                    className="task__check"
                    type="checkbox"
                    checked={o.completed}
                    onChange={() => handleToggleTask(o.id)}
                    />
                    {o.name}
                </span>
                <span className="task-table__cell">
                    {o.category && <span className={`tag tag--${o.category}`}>{o.category}</span>}
                </span>
                <span className="task-table__cell task-table__cell--muted">{o.dueDate}</span>
                <span className="task-table__cell">
                    <span className={`priority priority--${o.priority.toLowerCase()}`}>{o.priority}</span>
                </span>
                <span className="task-table__cell task-table__cell--action">
                    <button type="button" className="task-delete" aria-label="Delete task" onClick={() => removeTask(o.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    </button>
                </span>
                </li>
            ))}
                </ul>
            </article>
        </>
    )
}

export default Assembly
