import React, { useState, useEffect } from "react";

export default function Contact() {
  //initial values
  const initialValues = {
    userName: "",
    emailAddress: "",
    textInfo: "",
  };

  //initial form state and users state
  const [form, setFrom] = useState(initialValues);
  const [users, setUsers] = useState([]);

  //handle form inputs on change
  function handleFormInputs(e) {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  //handle form on clear
  function handleFormClear(e) {
    setFrom(initialValues);
  }

  //handle form submit and api calling
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //API Call
    const response = await fetch("http://localhost:3001/postdata", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsers(users.concat(data));
    setFrom(initialValues);
    // e.target.reset()
  };

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/userdata", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert(error.message)
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="container my-3">
        <div className="align-items-center">
          <strong>
            <h1 className="fontPrimaryColor fontSize30 marginbottom">
              Conact Us Form
            </h1>
          </strong>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlInput1"
            >
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Mohsin Raza"
              name="userName"
              value={form.userName}
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlInput2"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="mohsin.tech101@example.com"
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="form-group">
            <label
              className="fontPrimaryColor fontSize20"
              htmlFor="exampleFormControlTextarea1"
            >
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="My name is Mohsin Raza."
              name="textInfo"
              value={form.textInfo}
              onChange={handleFormInputs}
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-primary mx-1"
            onClick={handleFormClear}
          >
            Clear
          </button>
          <button type="submit" className="btn btn-primary mx-1">
            Submit
          </button>
        </form>
      </div>
      <div className="container my-3">
        <hr />
        <strong>
          <h1 className="fontPrimaryColor fontSize30 margintop">
            #Conact Information
          </h1>
        </strong>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.useremail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="container my-3">{JSON.stringify(form)}</div> */}
    </div>
  );
}
