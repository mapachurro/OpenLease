import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../index.css"

class Navbar extends Component {
  state = {
    loggedIn: false,
  };
render(){
return(
    <div>
    <nav className="navbar navbar-light bg-light">
        <h1 className="navbar-brand" href="#">OpenLease Project</h1>
        <div className="navbar" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            {/* The original links from the Scala-written project are kept here in case rewriting as per Scala controller, or external linking to Scala controller, is required */}
              {/* <a className="nav-link" href="/html/index.template.scala">Overview<span className="sr-only">(current)</span></a> */}
              <Link to="/" className={window.location.pathname === "./pages/overview.js" ? "nav-link active" : "nav-link"}>Overview</Link>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="./newcontract.template.scala">Start a New Lease</a> */}
              <Link to="/new" className={window.location.pathname === "./pages/newlease.js" ? "nav-link active" : "nav-link"}>New Lease</Link>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link" href="./signup.template.scala">Sign Up</a> */}
                <Link to="/signup" className={window.location.pathname === "./pages/signup.js" ? "nav-link active" : "nav-link"}>Sign Up</Link>
                </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="./login.template.scala">Log In</a> */}
              <Link to="/login" className={window.location.pathname === "./pages/login.js" ? "nav-link active" : "nav-link"}>Log In</Link>
            </li>
          </ul>
        </div>
      </nav>

      </div>
);
}
}

export default Navbar;