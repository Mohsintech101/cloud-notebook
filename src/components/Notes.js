import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteCotext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

export default function Notes({ ChangeAlert }) {
  //useContext
  const context = useContext(NoteContext);
  const { noteState, getNotes } = context;

  const navigate = useNavigate()
  //useEffect
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes()
    }
    else
    {
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  return (
    <>
     <div className="container mt-5">
        <h2 className="fontSize30 fontPrimaryColor">Your Notes (<span className="fontSecondaryColor">Total Notes:</span> <span className="fontTertiaryColor">{noteState.length}</span>)</h2>
      </div>
      <div className="container row">
        {noteState.map((note) => {
          return <NoteItem key={note._id} note={note} ChangeAlert={ChangeAlert}/>;
        })}
      </div>
    </>
  );
}

