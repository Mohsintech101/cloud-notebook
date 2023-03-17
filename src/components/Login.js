import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ ChangeAlert }) {

  //host and login api
  const host = process.env.REACT_APP_HOST
  const loginApi = process.env.REACT_APP_LOGIN

  //login initial values
  const loginInitialValues = {
    loginemail: "",
    loginpassword: "",
  };

  //login state
  const [loginForm, setLoginForm] = useState(loginInitialValues);

  //handle login input values
  const handleLoginInputValues = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  //usehistory
  const navigate = useNavigate();

  //handle login form submit
  const handleLoginSubmitForm = async (e) => {
    e.preventDefault();
    //API Call 
    try {
      const response = await fetch(`${host}${loginApi}`, {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.loginemail,
          password: loginForm.loginpassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const login = await response.json();
      console.log(login);
      if (login.success) {
        localStorage.setItem("token", login.authToken);
        navigate("/");
        ChangeAlert("Successfully Login", "success");
      } else {
        ChangeAlert(login.error, "danger");
      }
    } catch (error) {
      alert(error.message)
    }
  };
  //login form clear
  const handleFormClear = (e) => {
    setLoginForm(loginInitialValues);
  };
  return (
    <>
      <div>
        <strong>
          <h1 className="fontPrimaryColor fontSize30">Login Cloud Notebook</h1>
        </strong>
      </div>
      <form className="my-3" onSubmit={handleLoginSubmitForm}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label fontPrimaryColor fontSize20"
          >
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="loginemail"
            placeholder="Enter Your Email"
            value={loginForm.loginemail}
            onChange={handleLoginInputValues}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fontPrimaryColor fontSize20"
          >
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="loginpassword"
            placeholder="Enter Your Password"
            value={loginForm.loginpassword}
            onChange={handleLoginInputValues}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mx-2 my-3"
          onClick={handleFormClear}
        >
          Clear
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
