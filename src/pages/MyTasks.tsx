import PageHeader from '../components/PageHeader'
import NewTaskForm from '../components/NewTaskForm'
import type { StoredTaskTypes, TaskFilterTypes, sortTableName, sortTableDirection,sortTableHeaders } from '../types/types'
import { useState, type ReactNode } from 'react'

const STORAGE_KEY = 'focusdo.tasks'
const FILTERS: TaskFilterTypes['filter'][] = ['All', 'Active', 'Completed']

const PRIORITY_RANK: Record<'high' | 'medium' | 'low', number> = {
    high: 3,
    medium: 2,
    low: 1,
}



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


function SortableHeader( {label, sortKey, activeKey, direction, onSort} : sortTableHeaders) {
    const isActive = activeKey === sortKey
    return (
        <button type="button" className="task-table__sort" onClick={() => onSort(sortKey)}>
            {label}
            <span className="task-table__sort-arrow">{isActive ? (direction === 'asc' ? '▲' : '▼') : ''}</span>
        </button>
    )
}


function formatDueDate(dueDate: string, done: boolean): string {
    if (done) return 'Completed'

    const due = new Date(`${dueDate}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 7) return due.toLocaleDateString('en-US', { weekday: 'long' })
    return due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}



/****************************************************************************** */
// ASSEMBLY
/****************************************************************************** */

function Assembly() {

    const [isFormOpen, setFormOpen] = useState(false)
    const [filter, setFilter] = useState<TaskFilterTypes['filter']>('All')
    const [TASKS, setTasks] = useState<StoredTaskTypes[]>(() => [...getLocalStorageTasks().map(storedToRow)])
    const [sortKey, setSortKey] = useState<sortTableName | null>(null)
    const [sortDirection, setSortDirection] = useState<sortTableDirection>('asc')    

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

    function handleSort(key: sortTableName) {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortKey(key)
            setSortDirection('asc')
        }
    }

    const sortedTasks = [...FINAL_TASK_LIST].sort((a,b) => {
        if (!sortKey) return 0

        let result = 0
        if (sortKey === 'name') {
            result = a.name.localeCompare(b.name)
        } else if (sortKey === 'category') {
            result = a.category.localeCompare(b.category)
        } else if (sortKey === 'priority') {
            result = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
        }

        return sortDirection === 'asc' ? result : -result
    })

















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
                    <SortableHeader label="Task" sortKey="name" activeKey={sortKey} direction={sortDirection} onSort={handleSort} />
                    <SortableHeader label="category" sortKey="category" activeKey={sortKey} direction={sortDirection} onSort={handleSort} />
                    <span>Due</span>
                    <SortableHeader label="Priority" sortKey="priority" activeKey={sortKey} direction={sortDirection} onSort={handleSort} />
                    <span></span>
                </li>
                {resultsHTML}
                {sortedTasks.map((o) => (
                <li className={`task-table__row ${o.completed ? 'task-table__row--done' : ''}`} key={o.id}>

                    {/* NAME OF TASK */}
                    <span className="task-table__cell task-table__cell--main">
                        <input
                        className="task__check"
                        type="checkbox"
                        checked={o.completed}
                        onChange={() => handleToggleTask(o.id)}
                        />
                        {o.name}
                    </span>

                    {/* CATEGORY */}
                    <span className="task-table__cell">
                        {o.category && <span className={`tag tag--${o.category}`}>{o.category}</span>}
                    </span>

                    {/* DUE DATE */}
                    <span className="task-table__cell task-table__cell--muted">
                        {formatDueDate(o.dueDate, o.completed)}
                    </span>

                    {/* PRIORITY */}
                    <span className="task-table__cell">
                        <span className={`priority priority--${o.priority.toLowerCase()}`}>{o.priority}</span>
                    </span>

                    {/* DELETE TASK */}
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
