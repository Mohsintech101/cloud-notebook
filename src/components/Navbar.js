import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const handleAccountLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand primary-navbar-brand" to="/">
          NoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname} === '/' ? 'active' : ''`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname} === '/about' ? 'active' : ''`}
                to="/about"
              >
                About US
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname} === '/contactus' ? 'active' : ''`}
                to="/contactus"
              >
                Contact US Form
              </Link>
            </li>
          </ul>
          { !localStorage.getItem('token') ? <form className="d-flex">
          {location.pathname !== '/login' && <Link className="btn btn-primary mx-1" role="button" to='/login'>Login</Link>}
          {location.pathname !== '/signup' && <Link className="btn btn-primary mx-1" role="button" to='/signup'>Sign Up</Link>}
          </form> : <form className="d-flex">
          {location.pathname !== '/account' && <Link className="btn btn-primary mx-1" role="button" to='/account'>Account</Link>}
          <Link className="btn btn-primary mx-1" role="button" to='/login' onClick={handleAccountLogout}>Logout</Link>
          </form>}
        </div>
      </nav>
    </>
  );
}
