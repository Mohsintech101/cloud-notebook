import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteCotext";

export default function DeleteNotes({ id, ChangeAlert }) {
  //useContext
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  //Note Delete
  const handleDeleteNote = () => {
    deleteNote(id, ChangeAlert);
  };

  return (
    <>
      <i className="fa-solid fa-trash mx-1" onClick={handleDeleteNote}></i>
    </>
  );
}
