import React, { Component } from "react";
import { APIClient, Openlaw } from 'openlaw';
import Navbar from "../navbar"


const URL = "https://app.openlaw.io";  //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
// const TEMPLATE_NAME = "Draft Ohio Residential Lease"; //name of template stored on Openlaw
const OPENLAW_USER = 'oliver.renwick@gmail.com'; //add your Openlaw login email
const OPENLAW_PASSWORD = 'Palabra12' //add your Openlaw password
//create config 
const openLawConfig = {
  server: URL,
  // templateName:TEMPLATE_NAME,
  userName: OPENLAW_USER,
  password: OPENLAW_PASSWORD
}

//create an instance of the API client with url as parameter
const apiClient = new APIClient(URL);

class Previous extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      drafts: {}
    }
  }
  userLogin() {
    apiClient.login(openLawConfig.userName, openLawConfig.password).then(console.log)
  }

  searchDrafts() {
    apiClient.searchDrafts("Ross Campbell", 1, 10, "creationdate").then(console.log);
    console.log("post search")
  }

  componentDidMount = async () => {
    try {
      this.userLogin();
      this.searchDrafts();

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contracts. Check console for details.`,
      );
      console.error(error);
    }
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <div>
          <Navbar />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Previous Leases</h5>
              <h6 className="card-subtitle">Consult your past leases</h6>
              <p className="card-text">If there is a lease in the OpenLease system associated with your email address, it should appear below.
                    If it doesn't appear, try registering an account using the email address used to sign the lease.</p>
            </div>
          </div>

        </div>

      </div>
    );
    // 
  }

}
export default Previous;