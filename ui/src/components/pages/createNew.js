import React, { Component, Fragment, useEffect, useState } from "react";
import { render } from 'react-dom';
// import DraftOhioResidentialLease from "../../contracts/DraftOhioResidentialLease.json";
// import getWeb3 from "../../utils/getWeb3";
// import { Container, Grid, Button, Form} from 'semantic-ui-react';
import { APIClient, Openlaw } from 'openlaw';
import Navbar from "../navbar";
import 'dotenv'
import Collapsible from "../../Collapsible";
import OpenLawForm from 'openlaw-elements';
// import 'openlaw-elements/dist/esm/openlaw-elements.min.css';


const dotenv = require('dotenv');
dotenv.config();
const URL = "https://app.openlaw.io";  //url for your openlaw instance eg. "http://myinstancename.openlaw.io"
const TEMPLATE_NAME = "Draft Ohio Residential Lease"; //name of template stored on Openlaw
const OPENLAW_USER = "oliver.renwick@gmail.com"; //add your Openlaw login email
const OPENLAW_PASSWORD = "Palabra12" //add your Openlaw password
//create config 
// console.log("user: " + process.env.REACT_APP_OPENLAW_USER)
const openLawConfig = {
  server: URL,
  templateName: TEMPLATE_NAME,
  userName: OPENLAW_USER,
  password: OPENLAW_PASSWORD
}

//create an instance of the API client with url as parameter
const apiClient = new APIClient(URL);
apiClient.login(openLawConfig.userName, openLawConfig.password).then(console.log);


class CreateNew extends Component {

      static defaultProps = {
          stateLifter: () => {},
        };

        // trick eslint
        static propTypes = {
          stateLifter: () => {},
        };

  // //initial state of variables for BillOfSale Template, and web3,etc
  state = {

    Effective_Date: undefined,
    Landlord_Name: undefined,
    Tenant_Name: undefined,
    Property_Location: undefined,
    Lease_Commencement_Date: undefined,
    Lease_Termination_Date: undefined,
    Rent_Amount: undefined,
    Rent_Due_Date: undefined,
    Returned_Check_Fee: undefined,
    Rent_Increase_Date: undefined,
    Security_Deposit_Amount: undefined,
    Premises_Description: undefined,
    Daily_Animal_Restriction_Violation_Fee: undefined,
    Landlord_Notice_Address: undefined,
    Landlord_Email: undefined,
    Tenant_Email: undefined,

    UserObject: {},
    draftId: '',
    myTemplate: {},
    creatorId: '',
    //    web3: null,
    //    accounts: null,
    //    contract: null,
    //    instance: null,
    myTitle: '',
    myCompiledTemplate: null,

    definedValues: {},
    executionResult: {},
    parameters: {},
    variables: [],

  };

  componentDidMount = async () => {
    this.update();

    //Retrieve your OpenLaw template by name, use async/await 
    const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
    console.log("myTemplate: " + myTemplate)
    //pull properties off of JSON and make into variables
    const myTitle = myTemplate.title;
    //set title state
    this.setState({ myTitle });
    //

    //Retreive the OpenLaw Template, including MarkDown
    const myContent = myTemplate.content;
    this.setState({ myTemplate });
    console.log('myTemplate..', myTemplate);

    //Get the most recent version of the OpenLaw API Tutorial Template
    const versions = await apiClient.getTemplateVersions(openLawConfig.templateName, 20, 1);
    console.log("versions..", versions[0], versions.length);

    //Get the creatorID from the template. 
    // const creatorId = versions[0].creatorId;
    // console.log("creatorId..",creatorId);
    // this.setState({creatorId});

    //Get my compiled Template
    const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
    if (myCompiledTemplate.isError) {
      throw myCompiledTemplate.errorMessage;
    }
    console.log("my compiled template..", myCompiledTemplate);
    this.setState({ myCompiledTemplate });
    console.log("content inside didMount: " + this.state.myTemplate.content)    
  }

  update = (key, value) => {
    const updatedDraftParameters = key
      ? ({
        ...this.state.parameters,
        [key]: value,
      }) : (
        this.state.parameters
      );

    this.setState(({ parameters }) => {
      const concatParameters = { ...parameters, ...updatedDraftParameters };
      console.log("template: " + this.state.myTemplate.content)
      // https://docs.openlaw.io/openlaw-object/#compiletemplate
      const { compiledTemplate } = Openlaw.compileTemplate(TEMPLATE_NAME);
      // https://docs.openlaw.io/openlaw-object/#execute
      const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, concatParameters);

      if (errorMessage) {
        // eslint-disable-next-line no-undef
        console.error('Openlaw Execution Error:', errorMessage);
        return;
      }

      const state = {
        executionResult,
        parameters: concatParameters,
        // https://docs.openlaw.io/openlaw-object/#getexecutedvariables
        variables: Openlaw.getExecutedVariables(executionResult, {}),
      };

      // send props up
      this.props.stateLifter(state);

      return state;
    });
  };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and template. 
    //     <br></br>
    //     If nothing loads, refresh the page.</div>
    // }
    const inlineStyle = `
  .openlaw-form {
    margin-right: 24px;
    width: 50%;
  }
`;

    return (
        <Fragment>
          <style type="text/css">{inlineStyle}</style>
          {Object.keys(this.state.executionResult).length && (
            <OpenLawForm
              apiClient={apiClient}
              executionResult={this.state.executionResult}
              parameters={this.state.parameters}
              onChangeFunction={this.update}
              openLaw={Openlaw}
              renderSections={sectionsRenderer}
              sectionTransform={(section, index) => {
                // Transform & shape your sections here!
                // Must return an Object.
                // See the sectionsRenderer below for usage.
                return { section, mySuperCustomKey: `${index + 1}. `, index };
              }}
              textLikeInputClass="input"
              unsectionedTitle=""
              variables={this.state.variables}
            />
          )}
        </Fragment>
    );
  }
}

// eslint-disable-next-line react/prop-types
const sectionsRenderer = ({ children, ...sectionData }) => {
  const { section, mySuperCustomKey, index } = sectionData;

  return (
    Object.keys(sectionData).length && section
      // the section has a title
      ? (
        <Collapsible
          key={`section-${section}`}
          open={index === 0}
          overflowWhenOpen="visible"
          trigger={`${mySuperCustomKey || ''}${section}`}
          triggerDisabled={false}
        >
          {children()}
        </Collapsible>
        // section exists but no title, e.g. unsectionedTitle
      ) : (
        <Fragment key={`section-${section}`}>
          {children()}
        </Fragment>
      )
  );
};

const styles = {
  previewButton: {
    background: '#6c6cff',
    border: 'none',
    color: '#F9F9F9',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1em',
    padding: '12px 24px',
    position: 'fixed',
    right: 0,
    top: 0,
  },
  pre: {
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
  },
  wrapApp: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const renderPreviewHTML = (formState, callback) => () => {
  const { executionResult } = formState;
  const { agreement } = Openlaw.getAgreements(executionResult)[0];

  callback(Openlaw.renderForPreview(agreement, {}, {}));
};

const App = () => {
  const [formState, liftFormState] = useState();
  const [previewHTML, setPreviewHTML] = useState();

  useEffect(() => {
    // Scroll to top if there's a preview
    const previewHTMLElement = document.getElementById('root');
    if (previewHTMLElement) previewHTMLElement.scrollIntoView();
  }, [previewHTML]);

  return (
    <div>
      {previewHTML && (
        <Fragment>
          <div
            dangerouslySetInnerHTML={{ __html: previewHTML }}
            id="root"
          />
          <hr />
        </Fragment>
      )}

      <button
        onClick={renderPreviewHTML(formState, setPreviewHTML)}
        style={styles.previewButton}
      >
        Preview
      </button>

      <div style={styles.wrapApp}>
        <CreateNew statelifter={liftFormState} />
        <div>
          <pre style={styles.pre}>{TEMPLATE_NAME}</pre>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));

export default CreateNew;


    // try {
//       //Get network provider and web3 instance.
//       // const web3 = await getWeb3();
//       // const accounts = await web3.eth.getAccounts();
//       // console.log(accounts[0]);
//       // Get the contract instance.
//       // const networkId = await web3.eth.net.getId();
//       //Create an instance of smart contract 
//       // const deployedNetwork = DraftOhioResidentialLease.networks[networkId];
//       // const instance = new web3.eth.Contract(
//         // DraftOhioResidentialLease.abi,
//         // deployedNetwork && deployedNetwork.address,
//       // );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       // this.setState({ web3, accounts, contract: instance }, this.runExample);

//     //Login to your instance with your email and password, return JSON 
    // apiClient.login(openLawConfig.userName,openLawConfig.password).then(console.log);

//     // const drafts = apiClient.getDraftVersions(
//     //   "9285a52486fe289ad25c31df48d50107cc874adadd37e15eff42083aa7ca551e",
//     //   1,
//     //   1,
//     // );
//     // console.log("drafts: " + drafts[0]);
//     // const userId = drafts.creatorId;
//     // console.log("userId, that is, creator ID: " + userId)

//     //Retrieve your OpenLaw template by name, use async/await 
//     const myTemplate = await apiClient.getTemplate(openLawConfig.templateName);
//    console.log("myTemplate: " + myTemplate)
//    //pull properties off of JSON and make into variables
//     const myTitle = myTemplate.title;
//     //set title state
//     this.setState({myTitle});
//     //s

//     //Retreive the OpenLaw Template, including MarkDown
//     const myContent = myTemplate.content;
//     this.setState({myTemplate});
//     console.log('myTemplate..', myTemplate);

//     //Get the most recent version of the OpenLaw API Tutorial Template
//     const versions = await apiClient.getTemplateVersions(openLawConfig.templateName, 20, 1);
//     console.log("versions..",versions[0], versions.length);

//     //Get the creatorID from the template. 
//     // const creatorId = versions[0].creatorId;
//     // console.log("creatorId..",creatorId);
//     // this.setState({creatorId});

//     //Get my compiled Template, for use in rendering the HTML in previewTemplate
//     const myCompiledTemplate = await Openlaw.compileTemplate(myContent);
//     if (myCompiledTemplate.isError) {
//       throw myCompiledTemplate.errorMessage;
//     }
//      console.log("my compiled template..", myCompiledTemplate);
//      this.setState({myCompiledTemplate});

    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert(
    //     `Failed to load web3, accounts, or contract. Check console for details.`,
    //   );
    //   console.error(error);
    // }


// /*Preview OpenLaw Template*/
// previewTemplate = async (event) => {
//     console.log('preview of openlaw draft..');
//     event.preventDefault();
//       //Display HTML 
//     try{

//       const params = {
//         "Effective Date": this.state.Effective_Date,
//         "Landlord Name": this.state.Landlord_Name,
//         "Tenant Name": this.state.Tenant_Name,
//         "Property Location": this.state.Property_Location,
//         "Lease Commencement Date": this.state.Lease_Commencement_Date,
//         "Lease Termination Date": this.state.Lease_Termination_Date, 
//         "Rent Amount": this.state.Rent_Amount,
//         "Rent Due Date": this.state.Rent_Due_Date,
//         "Returned Check Fee": this.state.Returned_Check_Fee,
//         "Rent Increase Date": this.state.Rent_Increase_Date,
//         "Security Deposit Amount": this.state.Security_Deposit_Amount,
//         "Premises Description": this.state.Premises_Description,
//         "Daily Animal Restriction Violation Fee": this.state.Daily_Animal_Restriction_Violation_Fee,
//         "Landlord Notice Address": this.state.Landlord_Notice_Address,
//         "Landlord Email": JSON.stringify(this.convertUserObject(this.state.Landlord_Email)),
//         "Tenant Email": JSON.stringify(this.convertUserObject(this.state.Tenant_Email))
//        };

//        const executionResult = await Openlaw.execute(this.state.myCompiledTemplate.compiledTemplate, {}, params);
//        const agreements = await Openlaw.getAgreements(executionResult.executionResult);
//        const html = await Openlaw.renderForReview(agreements[0].agreement,{});
//        console.log("this is the html..", html); 
//        //set html state
//        this.setState({html});
//    }//try

//   catch(error){
//       console.log("draft not submitted yet..", error);
//   }
// };

// /*HELPERS*/
//   // runExample = async () => {
//   //   const { accounts, contract } = this.state;
//   //   console.log("OpenLease starting");
//   // };
// /*converts an email address into an object, to be used with uploadDraft
// or upLoadContract methods from the APIClient.
// Eventually this function will no longer be needed. */

//   convertUserObject = (original) => {
//     console.log("original email : " + original.email)
//     const object = {
//       id: {
//         id: original.id
//       },
//       email: original.email,
//       identifiers: [
//         {
//           identityProviderId: "openlaw",
//           identifier: original.identifiers[0].id
//         }
//       ]     
//     }
//     console.log("UserObject returned: " + original.id)
//     this.setState({UserObject: original})
//     return object;
//   }

// /*Build Open Law Params to Submit for Upload Contract*/
//   buildOpenLawParamsObj = async (myTemplate) => {
//     console.log("within buildOpenLawParamsObj : ")

//   const landlord = await apiClient.getUserDetails(this.state.Landlord_Email);
//   const tenant = await apiClient.getUserDetails(this.state.Tenant_Email);
//   // console.log("landlord name: " + landlord.name)
//   // console.log("tenant name: " + tenant.name)
//   console.log(this.state.UserObject)

//     const object = {
//       templateId: myTemplate.id,
//       title: myTemplate.title,
//       text: myTemplate.content,
//       creator: OPENLAW_USER,
//       parameters: {
//         "Effective Date": this.state.Effective_Date,
//         "Landlord Name": this.state.Landlord_Name,
//         "Tenant Name": this.state.Tenant_Name,
//         "Property Location": this.state.Property_Location,
//         "Lease Commencement Date": this.state.Lease_Commencement_Date,
//         "Lease Termination Date": this.state.Lease_Termination_Date,
//         "Rent Amount": this.state.Rent_Amount,
//         "Rent Due Date": this.state.Rent_Due_Date,
//         "Returned Check Fee": this.state.Returned_Check_Fee,
//         "Rent Increase Date": this.state.Rent_Increase_Date,
//         "Security Deposit Amount": this.state.Security_Deposit_Amount,
//         "Premises Description": this.state.Premises_Description,
//         "Daily Animal Restriction Violation Fee": this.state.Daily_Animal_Restriction_Violation_Fee,
//         "Landlord Notice Address": this.state.Landlord_Notice_Address,
//         "Landlord Email": JSON.stringify(this.convertUserObject(landlord)),
//         "Tenant Email": JSON.stringify(this.convertUserObject(tenant))
//       },
//       overriddenParagraphs: {},
//       agreements: {},
//       readonlyEmails: [],
//       editEmails: [],
//       draftId: this.state.draftId
//     };
//     console.log(object)
//     return object;
//   };

//   onSubmit = async(event) => {
//     console.log('submitting to OL..');
//     console.log(this.state);
//     event.preventDefault();

//     try{
//       //login to api
//       apiClient.login(openLawConfig.userName,openLawConfig.password);
//       console.log('apiClient logged in');

//       //Make user admin
//       // apiClient.toAdminUser(this.UserObject).then(console.log);
//       // console.log("Adminified!")

//       //add Open Law params to be uploaded
//       const uploadParams = await this.buildOpenLawParamsObj(this.state.myTemplate);
//       console.log('parameters from user..', uploadParams.parameters);
//       console.log('all parameters uploading...', uploadParams);

//       //uploadDraft, sends a draft contract to "Draft Management", which can be edited. 
//       const draftId = await apiClient.uploadDraft(uploadParams);
//       console.log('draft id..', draftId);
//       this.setState({draftId});

//       // uploadContract, this sends a completed contract to "Contract Management", where it can not be edited.
//       // const result = await apiClient.uploadContract(uploadParams);
//       // console.log('results..', result)
//        }
//     catch(error){
//       console.log(error);
//     }
//   }
