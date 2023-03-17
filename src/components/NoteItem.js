import React from "react";
import DeleteNotes from "./DeleteNotes";
import EditNotes from "./EditNotes";

export default function NoteItem({ note, ChangeAlert }) {
  return (
    <>
      <div className="col-md-6">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-self position-relative">
              <h5 className="card-title fontPrimaryColor ">
                <strong>{note.title}</strong>
              </h5>

              <div className="btnright">
              <span className="fontbtn">
                <EditNotes
                  note={note}
                  ChangeAlert={ChangeAlert}
                />
              </span>
              <span className="fontbtn">
                <DeleteNotes id={note._id} ChangeAlert={ChangeAlert} />
              </span>
              </div>
            </div>
            <p className="tagColor">{note.tag}</p>
            <p className="card-text cardDescriptionColor">
              {note.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
