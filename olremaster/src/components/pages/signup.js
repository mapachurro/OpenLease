import React, { Component } from "react";
import Navbar from "../navbar"
import "../../App.css"


class Signup extends Component {
    render() {
        return (
            <div>
                <Navbar/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Create a new account</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Sign up before making a lease</h6>
                    <p className="card-text">In order to user OpenLease's services, you'll need an account with OpenLaw. Don't worry--it's quick and free.
                    <br></br>
                    Follow the link here to sign up, and come back when you've created an account. This will allow OpenLaw to handle the signing of your lease.
                    <br></br>
                    <a href="https://app.openlaw.io/signup">Sign up for OpenLaw</a>
                    </p>
                </div>
            </div>

            </div>
        );
    }
}

export default Signup;






