import React, { Component } from "react";
// import DraftOhioResidentialLease from "../../contracts/DraftOhioResidentialLease.json";
// import getWeb3 from "../../utils/getWeb3";
import { Container, Grid, Button, Form} from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import Navbar from "../navbar";
import 'dotenv'

    const dotenv = require ('dotenv');
    dotenv.config(); 
    const URL = "https://app.openlaw.io";  //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
    const TEMPLATE_NAME = "Draft Ohio Residential Lease"; //name of template stored on Openlaw
    const OPENLAW_USER = "oliver.renwick@gmail.com"; //add your Openlaw login email
    const OPENLAW_PASSWORD = "Palabra12" //add your Openlaw password
    //create config 
    // console.log("user: " + process.env.REACT_APP_OPENLAW_USER)
    const openLawConfig = {
      server:URL, 
      templateName:TEMPLATE_NAME,
      userName:OPENLAW_USER,
      password:OPENLAW_PASSWORD
    }
    
    //create an instance of the API client with url as parameter
    const apiClient = new APIClient(URL);

class Newlease extends Component {
  
//initial state of variables for BillOfSale Template, and web3,etc
  state = { 

   Effective_Date: null,
   Landlord_Name: '',
   Tenant_Name: '',
   Property_Name: '',
   Lease_Commencement_Date: null,
   Lease_Termination_Date: null, 
   Rent_Amount: null,
   Rent_Due_Date: '',
   Returned_Check_Fee: null,
   Rent_Increase_Date: '',
   Security_Deposit_Amount: null,
   Premises_Description: '',
   Daily_Animal_Restriction_Violation_Fee: null,
   Landlord_Notice_Address: '',
   Landlord_Email: '',
   Tenant_Email: '',

   UserObject: {},
   draftId: "",
   myTemplate: {},
   creatorId: "",
  //  web3: null,
  //  accounts: null,
  //  contract: null,
   instance: null,
   myTitle: "",
   myCompiledTemplate: null,

  };

  componentDidMount = async () => {
    try {
      //Get network provider and web3 instance.
      // const web3 = await getWeb3();
      // const accounts = await web3.eth.getAccounts();
      // console.log(accounts[0]);
      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      //Create an instance of smart contract 
      // const deployedNetwork = DraftOhioResidentialLease.networks[networkId];
      // const instance = new web3.eth.Contract(
        // DraftOhioResidentialLease.abi,
        // deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);

    //Login to your instance with your email and password, return JSON 
    apiClient.login(openLawConfig.userName,openLawConfig.password).then(console.log);

    // const drafts = apiClient.getDraftVersions(
    //   "9285a52486fe289ad25c31df48d50107cc874adadd37e15eff42083aa7ca551e",
    //   1,
    //   1,
    // );
    // console.log("drafts: " + drafts[0]);
    // const userId = drafts.creatorId;
    // console.log("userId, that is, creator ID: " + userId)

    //Retrieve your OpenLaw template by name, use async/await 
    const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
   console.log("myTemplate: " + myTemplate)
   //pull properties off of JSON and make into variables
    const myTitle = myTemplate.title;
    //set title state
    this.setState({myTitle});
    //s

    //Retreive the OpenLaw Template, including MarkDown
    const myContent = myTemplate.content;
    this.setState({myTemplate});
    console.log('myTemplate..', myTemplate);

    //Get the most recent version of the OpenLaw API Tutorial Template
    const versions = await apiClient.getTemplateVersions(openLawConfig.templateName, 20, 1);
    console.log("versions..",versions[0], versions.length);
    
    //Get the creatorID from the template. 
    const creatorId = versions[0].creatorId;
    console.log("creatorId..",creatorId);
    this.setState({creatorId});

    //Get my compiled Template, for use in rendering the HTML in previewTemplate
    const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
    if (myCompiledTemplate.isError) {
      throw myCompiledTemplate.errorMessage;
    }
     console.log("my compiled template..", myCompiledTemplate);
     this.setState({myCompiledTemplate});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

/*Preview OpenLaw Template*/
previewTemplate = async (event) => {
    console.log('preview of openlaw draft..');
    event.preventDefault();
      //Display HTML 
    try{
      
      const params = {
        "Effective Date": this.state.Effective_Date,
        "Landlord Name": this.state.Landlord_Name,
        "Tenant Name": this.state.Tenant_Name,
        "Property Name": this.state.Property_Name,
        "Lease Commencement Date": this.state.Lease_Commencement_Date,
        "Lease Termination Date": this.state.Lease_Termination_Date, 
        "Rent Amount": this.state.Rent_Amount,
        "Rent Due Date": this.state.Rent_Due_Date,
        "Returned Check Fee": this.state.Returned_Check_Fee,
        "Rent Increase Date": this.state.Rent_Increase_Date,
        "Security Deposit Amount": this.state.Security_Deposit_Amount,
        "Premises Description": this.state.Premises_Description,
        "Daily Animal Restriction Violation Fee": this.state.Daily_Animal_Restriction_Violation_Fee,
        "Landlord Notice Address": this.state.Landlord_Notice_Address,
        "Landlord Email": JSON.stringify(this.convertUserObject(this.state.Landlord_Email)),
        "Tenant Email": JSON.stringify(this.convertUserObject(this.state.Tenant_Email))
       };
      
       const executionResult = await Openlaw.execute(this.state.myCompiledTemplate.compiledTemplate, {}, params);
       const agreements = await Openlaw.getAgreements(executionResult.executionResult);
       const html = await Openlaw.renderForReview(agreements[0].agreement,{});
       console.log("this is the html..", html); 
       //set html state
       this.setState({html});
   }//try
 
  catch(error){
      console.log("draft not submitted yet..", error);
  }
};

/*HELPERS*/
  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //   console.log("OpenLease starting");
  // };
/*converts an email address into an object, to be used with uploadDraft
or upLoadContract methods from the APIClient.
Eventually this function will no longer be needed. */

  convertUserObject = (original) => {
    console.log("original email : " + original.email)
    const object = {
      id: {
        id: original.id
      },
      email: original.email,
      identifiers: [
        {
          identityProviderId: "openlaw",
          identifier: original.identifiers[0].id
        }
      ]     
    }
    console.log("UserObject returned: " + original.id)
    this.setState({UserObject: original})
    return object;
  }

/*Build Open Law Params to Submit for Upload Contract*/
  buildOpenLawParamsObj = async (myTemplate) => {
    console.log("within buildOpenLawParamsObj : ")

  const landlord = await apiClient.getUserDetails(this.state.Landlord_Email);
  const tenant = await apiClient.getUserDetails(this.state.Tenant_Email);
  // console.log("landlord name: " + landlord.name)
  // console.log("tenant name: " + tenant.name)
  console.log(this.state.UserObject)

    const object = {
      templateId: myTemplate.id,
      title: myTemplate.title,
      text: myTemplate.content,
      creator: OPENLAW_USER,
      parameters: {
        "Effective Date": this.state.Effective_Date,
        "Landlord Name": this.state.Landlord_Name,
        "Tenant Name": this.state.Tenant_Name,
        "Property Name": this.state.Property_Name,
        "Lease Commencement Date": this.state.Lease_Commencement_Date,
        "Lease Termination Date": this.state.Lease_Termination_Date,
        "Rent Amount": this.state.Rent_Amount,
        "Rent Due Date": this.state.Rent_Due_Date,
        "Returned Check Fee": this.state.Returned_Check_Fee,
        "Rent Increase Date": this.state.Rent_Increase_Date,
        "Security Deposit Amount": this.state.Security_Deposit_Amount,
        "Premises Description": this.state.Premises_Description,
        "Daily Animal Restriction Violation Fee": this.state.Daily_Animal_Restriction_Violation_Fee,
        "Landlord Notice Address": this.state.Landlord_Notice_Address,
        "Landlord Email": JSON.stringify(this.convertUserObject(landlord)),
        "Tenant Email": JSON.stringify(this.convertUserObject(tenant))
      },
      overriddenParagraphs: {},
      agreements: {},
      readonlyEmails: [],
      editEmails: [],
      draftId: myTemplate.id
    };
    console.log(object)
    return object;
  };

  onSubmit = async(event) => {
    console.log('submitting to OL..');
    console.log(this.state);
    event.preventDefault();

    try{
      //login to api
      apiClient.login(openLawConfig.userName,openLawConfig.password);
      console.log('apiClient logged in');

      //Make user admin
      // apiClient.toAdminUser(this.UserObject).then(console.log);
      // console.log("Adminified!")

      //add Open Law params to be uploaded
      const uploadParams = await this.buildOpenLawParamsObj(this.state.myTemplate);
      console.log('parameters from user..', uploadParams.parameters);
      console.log('all parameters uploading...', uploadParams);
      
      //uploadDraft, sends a draft contract to "Draft Management", which can be edited. 
      // const draftId = await apiClient.uploadDraft(uploadParams.parameters);
      // console.log('draft id..', draftId);
      // this.setState({draftId});

      // uploadContract, this sends a completed contract to "Contract Management", where it can not be edited.
      console.log('parameters uploaded')
      const result = await apiClient.uploadContract(uploadParams);
      console.log('results..', result)
       }
    catch(error){
      console.log(error);
    }
  }

    
  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and template. 
    //     <br></br>
    //     If nothing loads, refresh the page.</div>
    // }
    return (
      <div className="App">
        <Navbar />
        <Container>
                <h1>OpenLaw </h1>
                <h3>{this.state.myTitle} </h3>

             {/* Show HTML in 'Preview' beware dangerouslySet... for xss vulnerable */}
                <Grid columns={2}>
                  <Grid.Column>
                    <Form onSubmit = {this.onSubmit}>
                    <Form.Field>
                        <label className="label">Effective Date : </label>
                        <br></br>
                        <input className="entry" 
                          placeholder = 'Effective date of lease'
                          onChange = {event => this.setState({Effective_Date: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label className="label">Landlord Name : </label>
                        <input className="entry" 
                          placeholder = "Landlord name"
                          onChange = {event =>  this.setState({Landlord_Name: event.target.value}) }
                        />
                      </Form.Field>
                       <Form.Field>
                        <label className="label">Tenant Name : </label>
                        <input className="entry" 
                        placeholder = "Tenant name"
                          onChange = {event => this.setState({Tenant_Name: event.target.value})}
                        />
                      </Form.Field>
                        <Form.Field>
                        <label className="label">Property name :</label>
                        <input className="entry" 
                      placeholder = "Address of Property"
                          onChange = {event => this.setState({Property_Name: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Lease begin date :</label>
                        <input className="entry" 
                      placeholder = "First date of lease"
                          onChange = {event => this.setState({Lease_Commencement_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Lease end date :</label>
                        <input className="entry" 
                      placeholder = "Date lease ends"
                          onChange = {event => this.setState({Lease_Termination_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Rent amount :</label>
                        <input className="entry" 
                      placeholder = "Monthly rent payment"
                          onChange = {event => this.setState({Rent_Amount: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Rent due date :</label>
                        <input className="entry" 
                      placeholder = "Day each month that rent is due"
                          onChange = {event => this.setState({Rent_Due_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Returned check fee :</label>
                        <input className="entry" 
                      placeholder = "Fee for returned checks"
                          onChange = {event => this.setState({Returned_Check_Fee: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label className="label">Rent increase date :</label>
                        <input className="entry" 
                      placeholder = "Nonpayment penalty date"
                          onChange = {event => this.setState({Rent_Increase_Date: event.target.value})}
                        />  
                      </Form.Field>   
                         <Form.Field>
                        <label className="label">Security Deposit Amount : </label>
                        <input className="entry" 
                          placeholder = 'Security deposit amount'
                          onChange = {event => this.setState({Security_Deposit_Amount: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label className="label">Premises Description : </label>
                        <input className="entry" 
                          placeholder = 'Any information beyond the address'
                          onChange = {event => this.setState({Premises_Description: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label className="label">Daily Animal Fee : </label>
                        <input className="entry" 
                          placeholder = 'Daily penalty'
                          onChange = {event => this.setState({Daily_Animal_Restriction_Violation_Fee: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label className="label">Landlord Notice Address : </label>
                        <input className="entry" 
                          placeholder = 'Address for notice for landlord'
                          onChange = {event => this.setState({Landlord_Notice_Address: event.target.value})}
                         />
                      </Form.Field>  

                      <br></br>

                      <Form.Field>
                        <label className="label">Landlord Email : </label>
                        <input className="entry" 
                          type="text" placeholder="Landlord Email Address : "
                          onChange={event => this.setState({Landlord_Email: event.target.value})}
                          />
                      </Form.Field>  
                       <Form.Field>
                        <label className="label">Tenant Email : </label>
                        <input className="entry" 
                          type="text" placeholder="Tenant Email Address : "
                          onChange={event => this.setState({Tenant_Email: event.target.value})} />
                      </Form.Field>
                      <br></br>                                      
                      <Button color='pink' type="submit"> Submit Draft </Button>
                    </Form>

                  </Grid.Column>
                <br></br>
                <Grid.Column>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}} />
                   <Button onClick = {this.previewTemplate}>Preview</Button>
                  </Grid.Column>
                </Grid>

        </Container>
      </div>
    );
  }
}

export default Newlease;


