import React, { Component } from "react";
import DraftOhioResidentialLease from "../../contracts/DraftOhioResidentialLease.json";
import getWeb3 from "../../utils/getWeb3";
import { Container, Grid, Button, Form} from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import Navbar from "../navbar"


    const URL = "https://app.openlaw.io";  //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
    const TEMPLATE_NAME = "Draft Ohio Residential Lease"; //name of template stored on Openlaw
    const OPENLAW_USER = 'oliver.renwick@gmail.com'; //add your Openlaw login email
    const OPENLAW_PASSWORD = 'Palabra12' //add your Openlaw password
    //create config 
    const openLawConfig = {
      server:URL, 
      templateName:TEMPLATE_NAME,
      userName:OPENLAW_USER,
      password:OPENLAW_PASSWORD
    }
    
    //create an instance of the API client with url as parameter
    const apiClient = new APIClient(URL);

class App extends Component {
  
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

   UserObject: {}

  };

  componentDidMount = async () => {
    try {
      //Get network provider and web3 instance.
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      //Create an instance of smart contract 
      const deployedNetwork = DraftOhioResidentialLease.networks[networkId];
      const instance = new web3.eth.Contract(
        DraftOhioResidentialLease.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);

    //Login to your instance with your email and password, return JSON 
    apiClient.login(openLawConfig.userName,openLawConfig.password).then(console.log);
    

    //Retrieve your OpenLaw template by name, use async/await 
    const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
   
   //pull properties off of JSON and make into variables
    const myTitle = myTemplate.title;
    //set title state
    this.setState({myTitle});

    //Retreive the OpenLaw Template, including MarkDown
    const myContent = myTemplate.content;
    this.setState({myTemplate});
    console.log('myTemplate..',myTemplate);

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
        "Landlord Email": this.state.Landlord_Email,
        "Tenant Email": this.state.Tenant_Email
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
    console.log("original email : ")
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
    console.log("within buildOpenLawParamsObj : " + this.state)

  const landlord = await apiClient.getUserDetails(this.state.Landlord_Email);
  const tenant = await apiClient.getUserDetails(this.state.Tenant_Email);


    const object = {
      templateId: myTemplate.id,
      title: myTemplate.title,
      text: myTemplate.content,
      creator: this.state.creatorId,
      parameters: {
        "Effective Date": this.state.Effective_Date,
        "Landlord Name": this.state.Landlord_Name,
        "Tenant Name": this.state.Tenant_Name,
        "Property Name": this.state.Property_Name,
        "Lease Commencement Date": this.state.Lease_Commencement_Date,
        "Lease Termination Date": this.state.Lease_Termination_Date,
        "Rent Amount": this.state.Rent_Amount,
        "Rent Due Date": this.state.Rent_Due_Date,
        "Returned Check Fee": "",
        "Rent Increase Date": this.state.Rent_Increase_Date,
        "Security Deposit Amount": this.state.Security_Deposit_Amount,
        "Premises Description": this.state.Premises_Description,
        "Daily Animal Restriction Violation Fee": this.state.Daily_Animal_Restriction_Violation_Fee,
        "Landlord Notice Address": this.state.Landlord_Notice_Address,
        "Landlord Email": this.state.Landlord_Email,
        "Tenant Email": this.state.Tenant_Email
      },
      overriddenParagraphs: {},
      agreements: {},
      readonlyEmails: [],
      editEmails: [],
      draftId: this.state.draftId
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
      const uploadParams = await this.buildOpenLawParamsObj(this.state.myTemplate,this.state.creatorId);
      console.log('parameters from user..', uploadParams.parameters);
      console.log('all parameters uploading...', uploadParams);
      
      //uploadDraft, sends a draft contract to "Draft Management", which can be edited. 
      const draftId = await apiClient.uploadDraft(uploadParams.parameters);
      console.log('draft id..', draftId);
      this.setState({draftId});

      //uploadContract, this sends a completed contract to "Contract Management", where it can not be edited.
      // const result = await apiClient.uploadContract(uploadParams);
      // console.log('results..', result)
       }
    catch(error){
      console.log(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar />
        <Container>
                <h1>OpenLaw </h1>
                <h2>{this.state.myTitle} </h2>

             {/* Show HTML in 'Preview' beware dangerouslySet... for xss vulnerable */}
                <Grid columns={2}>
                  <Grid.Column>
                    <Form onSubmit = {this.onSubmit}>
                    <Form.Field>
                        <label>Effective Date : </label>
                        <input className="entry" 
                          placeholder = 'Effective date of lease'
                          onChange = {event => this.setState({Effective_Date: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label>Landlord Name : </label>
                        <input className="entry" 
                          placeholder = "Landlord name"
                          onChange = {event =>  this.setState({Landlord_Name: event.target.value}) }
                        />
                      </Form.Field>
                       <Form.Field>
                        <label>Tenant Name : </label>
                        <input className="entry" 
                        placeholder = "Tenant name"
                          onChange = {event => this.setState({Tenant_Name: event.target.value})}
                        />
                      </Form.Field>
                        <Form.Field>
                        <label>Property name :</label>
                        <input className="entry" 
                      placeholder = "Address of Property"
                          onChange = {event => this.setState({Property_Name: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Lease begin date :</label>
                        <input className="entry" 
                      placeholder = "First date of lease"
                          onChange = {event => this.setState({Lease_Commencement_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Lease end date :</label>
                        <input className="entry" 
                      placeholder = "Date lease ends"
                          onChange = {event => this.setState({Lease_Termination_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Rent amount :</label>
                        <input className="entry" 
                      placeholder = "Monthly rent payment"
                          onChange = {event => this.setState({Rent_Due_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Rent due date :</label>
                        <input className="entry" 
                      placeholder = "Day each month that rent is due"
                          onChange = {event => this.setState({Rent_Due_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Returned check fee :</label>
                        <input className="entry" 
                      placeholder = "Fee for returned checks"
                          onChange = {event => this.setState({Rent_Due_Date: event.target.value})}
                        />
                        </Form.Field>
                        <Form.Field>
                        <label>Rent increase date :</label>
                        <input className="entry" 
                      placeholder = "Nonpayment penalty date"
                          onChange = {event => this.setState({Rent_Increase_Date: event.target.value})}
                        />  
                      </Form.Field>   
                         <Form.Field>
                        <label>Security Deposit Amount : </label>
                        <input className="entry" 
                          placeholder = 'Security deposit amount'
                          onChange = {event => this.setState({Security_Deposit_Amount: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label>Premises Description : </label>
                        <input className="entry" 
                          placeholder = 'Any information beyond the address'
                          onChange = {event => this.setState({Premises_Description: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label>Daily Animal Fee : </label>
                        <input className="entry" 
                          placeholder = 'Daily penalty'
                          onChange = {event => this.setState({Daily_Animal_Restriction_Fee: event.target.value})}
                         />
                      </Form.Field>  
                      <Form.Field>
                        <label>Landlord Notice Address : </label>
                        <input className="entry" 
                          placeholder = 'Address for notice for landlord'
                          onChange = {event => this.setState({Landlord_Notice_Address: event.target.value})}
                         />
                      </Form.Field>  


                      <br></br>

                      <Form.Field>
                        <label>Landlord Email : </label>
                        <input className="entry" 
                          type="text" placeholder="Landlord Email Address : "
                          onChange={event => {console.log(this.state, event.target.value); this.setState({Landlord_Email: event.target.value})} }/>
                      </Form.Field>  
                       <Form.Field>
                        <label>Tenant Email : </label>
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

export default App;


