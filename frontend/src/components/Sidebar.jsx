function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div className={`note-title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}>
                <h4 className="text-snippet">{note.body.split('\n')[0]}</h4>
            <i className="material-icons trash-icon" onClick={(event)=> props.deleteNote(event, note.id)}>clear</i>
            </div>
        </div>
    ))

    return (
        <section className="sidebar-pane">
            <div className="sidebar-header">
                <div className="header-title">
                <i className="material-icons notes-icon">checklist</i>
                <h2>Notes</h2>
                </div>
                <button className="add-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}

export default Sidebar;