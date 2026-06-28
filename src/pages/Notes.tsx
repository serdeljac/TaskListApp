import PageHeader from '../components/PageHeader'
import type { NoteTypes } from '../types/types'

    const NOTES: NoteTypes[] = [
        { id: 'n1', title: 'Project ideas', body: 'Sketch the onboarding flow and list the three core screens before Friday.', date: 'May 14', color: 'purple' },
        { id: 'n2', title: 'Groceries', body: 'Oats, almond milk, spinach, eggs, coffee beans, dark chocolate.', date: 'May 13', color: 'yellow' },
        { id: 'n3', title: 'Book quote', body: '"The secret of getting ahead is getting started." — keep on the wall.', date: 'May 12', color: 'green' },
        { id: 'n4', title: 'Standup notes', body: 'Blocked on API keys. Ask Sam. Demo moved to Thursday afternoon.', date: 'May 12', color: 'blue' },
        { id: 'n5', title: 'Workout split', body: 'Mon push, Tue pull, Wed legs, Thu rest, Fri full body.', date: 'May 10', color: 'green' },
        { id: 'n6', title: 'Gift ideas', body: 'Noise-cancelling headphones or a nice notebook set.', date: 'May 9', color: 'yellow' },
    ]

    function Notes() {
    return (
        <>
        <PageHeader
            title="Notes"
            subtitle="Quick thoughts and reminders."
            actionLabel="+ New Note"
        />

        <section className="note-grid">
            {NOTES.map((note) => (
            <article className={`note note--${note.color}`} key={note.id}>
                <h3 className="note__title">{note.title}</h3>
                <p className="note__body">{note.body}</p>
                <span className="note__date">{note.date}</span>
            </article>
            ))}
        </section>
        </>
    )
    }

    export default Notes
