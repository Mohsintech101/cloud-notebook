import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import NoteContext from "./context/notes/NoteState";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import ShowAlert from "./components/ShowAlert";
import Account from "./components/Account";

function App() {
  const [alert, setAlert] = useState(null);

  const ChangeAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <>
      <NoteContext>
        <BrowserRouter>
          <Navbar />
          <ShowAlert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home ChangeAlert={ChangeAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contactus" element={<Contact />} />
              <Route
                exact
                path="/login"
                element={<Login ChangeAlert={ChangeAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup ChangeAlert={ChangeAlert} />}
              />
              <Route
                exact
                path="/account"
                element={<Account ChangeAlert={ChangeAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteContext>
    </>
  );
}

export default App;
