import React, { Component } from "react";


class Signup extends Component {
    render() {
        return (
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Create a new account</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Enter your information below to create an account.</h6>
                    <p class="card-text">OpenLease takes privacy very seriously. Your information is yours: that's one of the main motivations
                    behind the creation of this project. So we will never use your information for any purpose other than allowing you to log in
                    and access your leases.</p>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">username</span>
                        <input type="text" class="form-control" placeholder="username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">password</span>
                        <input type="text" class="form-control" placeholder="password" aria-describedby="basic-addon1"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">email</span>
                        <input type="text" class="form-control" placeholder="email" aria-describedby="basic-addon1"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;






