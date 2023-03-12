import React, { useState, useEffect } from "react";

export default function Contact() {
  const initialValues = {
    userName: "",
    emailAddress: "",
    textInfo: "",
  };

  const [form, setFrom] = useState(initialValues);
  const [users, setUsers] = useState([]);

  function handleFormInputs(e) {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleFormClear(e) {
    setFrom(initialValues);
    e.target.userName = "";
    e.target.emailAddress = "";
    e.target.textInfo = "";
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
    // console.log("Response From Server",data)
    // console.log("From Data",form)
  };

  const getData = async () => {
    const response = await fetch("http://localhost:3001/userdata", {
      method: "GET",
    });
    const data = await response.json();
    setUsers(data);
    // console.log(data)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container my-3">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">User Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Your Name"
              name="userName"
              value={form.userName}
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput2">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="name@example.com"
              name="emailAddress"
              value={form.emailAddress}
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Enter Your Text Here"
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
      {/* <div className="container my-3">{JSON.stringify(form)}</div> */}
      <div className="container my-3">
        {/* <ol>
          {users.map((user) => (
            <li key={user._id}>
              {user.username}, {user.useremail}
            </li>
          ))}
        </ol> */}
        <hr />
        <table class="table table-hover">
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
    </div>
  );
}
