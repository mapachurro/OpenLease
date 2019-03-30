import React, { Component } from "react";
import "../components.css"
    

class Login extends Component {
    render() {
        return (
            <div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Log In</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Log in to see your leases</h6>
                    <p className="card-text">By logging in, you will be able to see the leases you have executed through OpenLease, and download .pdf versions of them.</p>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">username</span>
                        <input type="text" className="form-control" placeholder="username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">password</span>
                        <input type="text" className="form-control" placeholder="password" aria-describedby="basic-addon1"></input>
                    </div>
                </div>
            </div>

            </div>
        );
    }
}

export default Login;






