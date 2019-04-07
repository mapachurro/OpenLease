import React, { Component } from "react";
import { APIClient, Openlaw } from 'openlaw';
import Navbar from "../navbar"


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

class Previous extends Component {
  
constructor(props){
  super(props);
  this.state={
    data: {},
    drafts: {}
    
  }

}

  searchDrafts(){
    apiClient.searchDrafts(openLawConfig.userName, 1, 10, "creationdate").then(console.log);
    console.log("post search")
  }

  componentDidMount = async () => {
    try {


    //   //Retrieve your OpenLaw template by name, use async/await 
  //   const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
   
  //  //pull properties off of JSON and make into variables
  //   const myTitle = myTemplate.title;
  //   //set title state
  //   this.setState({myTitle});

  //   //Retreive the OpenLaw Template, including MarkDown
  //   const myContent = myTemplate.content;
  //   this.setState({myTemplate});
  //   console.log('myTemplate..',myTemplate);

  //   //Get the most recent version of the OpenLaw API Tutorial Template
  //   const versions = await apiClient.getTemplateVersions(openLawConfig.templateName, 20, 1);
  //   console.log("versions..",versions[0], versions.length);
    
  //   //Get the creatorID from the template. 
  //   const creatorId = versions[0].creatorId;
  //   console.log("creatorId..",creatorId);
  //   this.setState({creatorId});

  //   //Get my compiled Template, for use in rendering the HTML in previewTemplate
  //   const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
  //   if (myCompiledTemplate.isError) {
  //     throw myCompiledTemplate.errorMessage;
  //   }
  //    console.log("my compiled template..", myCompiledTemplate);
  //    this.setState({myCompiledTemplate});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  componentWillUnmount(){
    
  }

  render(){
      return (
        <div>
            <div>
                <Navbar/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Previous Leases</h5>
                    <h6 className="card-subtitle">Consult your past leases</h6>
                    <p className="card-text">If there is a lease in the OpenLease system associated with your email address, it should appear below.
                    If it doesn't appear, try registering an account using the email address used to sign the lease.</p>
                    {/* <UserInfo keycloak={this.state.keycloak} />
                    <Logout keycloak={this.state.keycloak} /> */}
                </div>
            </div>

            </div>

        </div>
      ); 
      // 
    }

  }
export default Previous;