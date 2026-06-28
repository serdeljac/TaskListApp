import { useState } from 'react'
interface NewTaskFormProps {
    // Called when the user wants to close the popup (e.g. clicks Cancel).
    onCancel: () => void
}

function NewTaskForm({ onCancel}: NewTaskFormProps) {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')


    const checkSubmitAllowed = name.trim() !== '' && category.trim() !== '' && date.trim() !== ''

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
                    <label className="form-field__label" htmlFor="task-due">Due date</label>
                    <input id="task-due" className="form-field__input" type="date" onChange={(event) => setDate(event.target.value)}/>
                </div>

                <div className="modal__actions">
                    <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancel</button>
                    <button type="button" className="btn btn--primary" disabled={!checkSubmitAllowed}>Submit</button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm