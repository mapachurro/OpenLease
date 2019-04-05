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
                    <h6 className="card-subtitle mb-2 text-muted">Enter your information below to create an account.</h6>
                    <p className="card-text">OpenLease takes privacy very seriously. Your information is yours: that's one of the main motivations
                    behind the creation of this project. So we will never use your information for any purpose other than allowing you to log in
                    and access your leases.</p>
                    <br></br>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">username :</span>
                        <input type="text" className="form-control, entry" placeholder="username" aria-describedby="basic-addon1"></input>
                    </div>
                    <br></br>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">password :</span>
                        <input type="text" className="form-control, entry" placeholder="password" aria-describedby="basic-addon1"></input>
                    </div>
                    <br></br>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">email :</span>
                        <input type="text" className="form-control, entry" placeholder="email" aria-describedby="basic-addon1"></input>
                    </div>

                    <br></br>

                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
            </div>

            </div>
        );
    }
}

export default Signup;






