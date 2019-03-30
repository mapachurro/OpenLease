import React, { Component } from "react";
    

class Login extends Component {
    render() {
        return (
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">username</span>
                        <input type="text" class="form-control" placeholder="username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">password</span>
                        <input type="text" class="form-control" placeholder="password" aria-describedby="basic-addon1"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;






