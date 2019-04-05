import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';
import Navbar from '../navbar'

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
        <div>
            <div>
                <Navbar/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Previous Leases</h5>
                    <h6 className="card-subtitle">Consult your past leases</h6>
                    <p className="card-text">If there is a lease in the OpenLease system associated with your email address, it should appear below.
                    If it doesn't appear, try registering an account using the email address used to sign the lease.</p>
                    <UserInfo keycloak={this.state.keycloak} />
                    <Logout keycloak={this.state.keycloak} />
                </div>
            </div>

            </div>

        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>
      <Navbar/>
      <div>Initializing Keycloak...</div>
      </div>
    );
  }
}
export default Secured;