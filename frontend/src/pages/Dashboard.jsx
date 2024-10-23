import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";

import github from "../../public/github.svg";

const Dashboard = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  ); // JSON.parse to convert string to array
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // setting items in localstorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes)); // JSON.stringify to convert the array into a string
    if (!user) {
      navigate("/login");
    }
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Your title",
    };

    setNotes((prevState) => [newNote, ...prevState]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((prevState) =>
      prevState.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prevState) => prevState.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <>
      <Sidebar
        notes={notes}
        currentNote={findCurrentNote()}
        setCurrentNoteId={setCurrentNoteId}
        newNote={createNewNote}
        deleteNote={deleteNote}
      />

      {currentNoteId && notes.length > 0 ? (
        <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
      ) : (
        <div className="no-notes">
          <h3>Welcome to your notes app!</h3>
          <h4>
            You don't have any notes.
            <p>
              {" "}
              Click the{" "}
              <button className="add-note" onClick={createNewNote}>
                +
              </button>{" "}
              to create a new note.
            </p>
          </h4>
          <a
            href="http://github.com/galieotrover/notesapp"
            target="_blank"
            rel="noreferrer"
          ></a>
          <img src={github} alt="github-logo" />
        </div>
      )}
    </>
  );
};
export default Dashboard;
