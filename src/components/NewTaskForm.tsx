import { useState } from 'react'
import type { StoredTaskTypes } from '../types/types'

interface NewTaskFormProps {
    // Called when the user wants to close the popup (e.g. clicks Cancel).
    onCancelFunc: () => void
    //This means task generated the StoredTaskTypes WITHOUT id. id is generated later!
    onSubmit: (task: Omit<StoredTaskTypes, 'id'| 'completed'>) => void
}

function NewTaskForm({ onCancelFunc, onSubmit}: NewTaskFormProps) {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState<StoredTaskTypes['priority'] | ''>('')
    const [dueDate, setDate] = useState('')
    const checkSubmitAllowed = name.trim() !== '' && category.trim() !== '' && dueDate.trim() !== '' && priority.trim() !== ''

    function handleSubmit() {
        //Prevents submit when not valid
        if (!checkSubmitAllowed || priority === '') return
        //Submit this object Array
        onSubmit({ name: name.trim(), category, priority, dueDate })
    }

    return (

        <div className="modal-overlay">
            <div className="modal">
                <div className="modal__header">
                <h2 className="modal__title">New Task</h2>
                </div>

                <form className="task-form">
                <div className="form-field">
                    <label className="form-field__label" htmlFor="task-name">Task name</label>
                    <input
                    id="task-name"
                    className="form-field__input"
                    type="text"
                    placeholder="e.g. Finish the report"
                    onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label className="form-field__label" htmlFor="task-category" >Category</label>
                        <select id="task-category" className="form-field__input" 
                        onChange={(event) => setCategory(event.target.value)}>
                        <option value="">Select a category</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                    </select>
                </div>

                <div className="form-field">
                    <label className="form-field__label" htmlFor="task-category" >Priority</label>
                        <select id="task-category" className="form-field__input"
                        onChange={(event) => setPriority(event.target.value as StoredTaskTypes['priority'])}>
                        <option value="">Select a Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="form-field">
                    <label className="form-field__label" htmlFor="task-due">Due date</label>
                    <input id="task-due" className="form-field__input" type="date" onChange={(event) => setDate(event.target.value)}/>
                </div>

                <div className="modal__actions">
                    <button type="button" className="btn btn--ghost" onClick={onCancelFunc}>Cancel</button>
                    <button 
                        type="button" 
                        className="btn btn--primary" 
                        disabled={!checkSubmitAllowed}
                        onClick={handleSubmit}>Submit</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm