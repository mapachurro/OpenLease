import React, { Component } from "react";
import Navbar from "../navbar"
import { APIClient, Openlaw } from 'openlaw';


const URL = "https://app.openlaw.io";  //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
// const TEMPLATE_NAME = "Draft Ohio Residential Lease"; //name of template stored on Openlaw
const OPENLAW_USER = 'oliver.renwick@gmail.com'; //add your Openlaw login email
const OPENLAW_PASSWORD = 'Palabra12' //add your Openlaw password
//create config 
const openLawConfig = {
  server:URL, 
  // templateName:TEMPLATE_NAME,
  userName:OPENLAW_USER,
  password:OPENLAW_PASSWORD
}

//create an instance of the API client with url as parameter
const apiClient = new APIClient(URL);

class Login extends Component {

constructor(props){
super(props);
this.state={
data: {},
username: '',
password: '',

}

this.onSubmit = this.onSubmit.bind(this)
}

onSubmit = async(event) => {
    console.log('submitting to OL..');
    event.preventDefault();

    apiClient.login(openLawConfig.userName,openLawConfig.password).then(data => {
        console.log(data);
        this.setState({data:data});
        return data;
        });
      console.log("current state: " + this.state.data)

}


searchDrafts(){
apiClient.searchDrafts(openLawConfig.userName, 1, 10, "creationdate").then(console.log);
console.log("post search")
}

componentDidMount = async () => {

}
    render() {
        return (
            <div>
                <Navbar/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Log In</h5>
                    <h6 className="card-subtitle">Log in to see your leases</h6>
                    <p className="card-text">By logging in, you will be able to see the leases you have executed through OpenLease, and download .pdf versions of them.</p>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">username</span>
                        <input type="text" className="form-control, entry" placeholder="username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">password</span>
                        <input type="password" className="form-control, entry" placeholder="password" aria-describedby="basic-addon1"></input>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary" onClick = {this.onSubmit}>Log In</button>
                </div>
            </div>

            </div>
        );
    }
}

export default Login;






