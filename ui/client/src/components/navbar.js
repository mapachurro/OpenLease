import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
render(){
return(
    <div>
    <nav className="navbar justify-content-center navbar-light bg-light">
        <h1 className="navbar-brand" href="#">OpenLease Project</h1>
        <div className="navbar justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            {/* The original links from the Scala-written project are kept here in case rewriting as per Scala controller, or external linking to Scala controller, is required */}
              {/* <a className="nav-link" href="/html/index.template.scala">Overview<span className="sr-only">(current)</span></a> */}
              <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Overview</Link>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="./newcontract.template.scala">Start a New Lease</a> */}
              <Link to="/" className={window.location.pathname === "/new" ? "nav-link active" : "nav-link"}>New</Link>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link" href="./signup.template.scala">Sign Up</a> */}
                <Link to="/" className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"}>Signup</Link>
            <li className="nav-item">
              {/* <a className="nav-link" href="./login.template.scala">Log In</a> */}
              <Link to="/" className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}>Login</Link>
            </li>
            </li>
          </ul>
        </div>
      </nav>

      </div>
);
}
}

export default Navbar;