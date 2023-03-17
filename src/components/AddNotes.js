import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteCotext";

export default function AddNotes({ ChangeAlert }) {
  //initial values
  const initialValues = {
    title: "",
    tag: "",
    description: "",
  };

  //setting form state
  const [form, setForm] = useState(initialValues);

  //handle Inputs
  const handleFormInputs = (e) => {
    //destructuring events
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //handle clear form
  const handleFormClear = () => {
    setForm(initialValues);
  };

  //useContext
  const context = useContext(NoteContext);
  const { addNote } = context;

  //handle form submit - AddNotes
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNote(form);
    ChangeAlert("Added Note Successfully", "success");
    setForm(initialValues);
  };

  return (
    <>
      <div className="container my-3">
        <strong>
          <h1 className="fontPrimaryColor fontSize30">
            Add Note to Cloud Notebook
          </h1>
        </strong>
        <form className="my-3" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlInput1"
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Video Sharing and Social Media Platform"
              name="title"
              value={form.title}
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlTextarea1"
            >
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="YouTube is a global online video sharing and social media platform headquartered in San Bruno, California."
              name="description"
              value={form.description}
              onChange={handleFormInputs}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlInput2"
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="YouTube"
              name="tag"
              value={form.tag}
              onChange={handleFormInputs}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={handleFormClear}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-primary mx-1">
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}
