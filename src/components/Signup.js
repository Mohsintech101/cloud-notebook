import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ ChangeAlert }) {

  //host and signup api
  const host = process.env.REACT_APP_HOST
  const signupApi = process.env.REACT_APP_SIGN_UP

  //login initial values
  const signupInitialValues = {
    signupname: "",
    signupemail: "",
    signuppassword: "",
    signupconfirmedpassword: "",
  };
  //login state
  const [signupForm, setSignupForm] = useState(signupInitialValues);

  //handle login input values
  const handleSignupInputValues = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  //usehistory
  const navigate = useNavigate();

  //handle login form submit
  const handleSignupSubmitForm = async (e) => {
    e.preventDefault();

    //destructuring signupForm
    const {
      signupname: name,
      signupemail: email,
      signuppassword: password,
      signupconfirmedpassword: cpassword,
    } = signupForm;
    if (password !== cpassword) {
      ChangeAlert("Password and confirm password does not match", "danger");
      return console.log("Password and confirm password does not match");
    }

    //API Call
    try {
      const response = await fetch(`${host}${signupApi}`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const signup = await response.json();
      console.log(signup);
      if (signup.success) {
        localStorage.setItem("token", signup.authToken);
        navigate("/login");
        ChangeAlert("Registered Successfully, Now You can Login", "success");
      } else {
        ChangeAlert(signup.error, "danger");
      }
    } catch (error) {
      alert(error.message)
    }
  };
  //login form clear
  const handleSignupFormClear = (e) => {
    setSignupForm(signupInitialValues);
  };
  return (
    <>
      <div>
        <strong>
          <h1 className="fontPrimaryColor fontSize30">
            Register Cloud Notebook
          </h1>
        </strong>
      </div>
      <form className="my-3" onSubmit={handleSignupSubmitForm}>
        <div className="mb-3">
          <label
            htmlFor="exampleInputName"
            className="form-label fontPrimaryColor fontSize20"
          >
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            aria-describedby="textHelp"
            name="signupname"
            placeholder="Enter Your Name"
            value={signupForm.signupname}
            onChange={handleSignupInputValues}
            required
          />
        </div>
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
            name="signupemail"
            placeholder="Enter Your Email"
            value={signupForm.signupemail}
            onChange={handleSignupInputValues}
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
            name="signuppassword"
            placeholder="Enter Your Password"
            value={signupForm.signuppassword}
            onChange={handleSignupInputValues}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword2"
            className="form-label fontPrimaryColor fontSize20"
          >
            Confirmed Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="signupconfirmedpassword"
            placeholder="Enter Password Again"
            value={signupForm.signupconfirmedpassword}
            onChange={handleSignupInputValues}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mx-2 my-3"
          onClick={handleSignupFormClear}
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
