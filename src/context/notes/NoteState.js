import { useState } from "react";
import NoteContext from "./NoteCotext";

const NoteState = (props) => {
  //host and notes api
  const host = process.env.REACT_APP_HOST;
  const getNoteApi = process.env.REACT_APP_GET_NOTES;
  const addNoteApi = process.env.REACT_APP_ADD_NOTES;
  const editNoteApi = process.env.REACT_APP_EDIT_NOTES;
  const deleteNoteApi = process.env.REACT_APP_DELETE_NOTES;

  //initial data
  const initialSampleData = [];

  //defining state and setState using useState hook
  const [noteState, setNoteState] = useState(initialSampleData);

  //Get Notes
  const getNotes = async () => {
    //API Call to get notes
    try {
      const response = await fetch(`${host}${getNoteApi}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const res = await response.json();
      setNoteState(res);
    } catch (error) {
      alert(error.message)
    }
  };

  //AddNote
  const addNote = async ({ title, description, tag }) => {
    //Add API
    try {
      const response = await fetch(`${host}${addNoteApi}`, {
        method: "POST",
        body: JSON.stringify({ title, description, tag }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newNote = await response.json();
      setNoteState(noteState.concat(newNote));
    } catch (error) {
      alert(error.message)
    }
  };

  //EditNote
  const editNote = async ( id, title, description, tag, ChangeAlert, onClose ) => {
    for (let index = 0; index < noteState.length; index++) {
      let elem = noteState[index];
      if (elem._id === id) {
        elem.title = title;
        elem.description = description;
        elem.tag = tag;
      }
    }

    //API Call
    try {
      const response = await fetch(`${host}${editNoteApi}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, tag }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      await response.json();
      ChangeAlert("Updated Note Successfully", "success");
      onClose()
    } catch (error) {
      ChangeAlert(error.message, "danger");
    }
  };

  //DeleteNote
  const deleteNote = async (id, ChangeAlert) => {
    console.log("Delete Note " + id);

    //Delete API
    try {
      const response = await fetch(`${host}${deleteNoteApi}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      await response.json();
      ChangeAlert("Deleted Successfully", "success");
    } catch (error) {
      ChangeAlert(error, "danger");
    }

    //delete note
    const deleteNote = noteState.filter((note) => note._id !== id);
    setNoteState(deleteNote);
  };

  return (
    <NoteContext.Provider
      value={{ noteState, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
