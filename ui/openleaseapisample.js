// /**
//  * ES2015: import for bundlers like webpack
//  */
 
// // import both modules
// import { APIClient, Openlaw } from "openlaw";
// // OR import only `Openlaw`
// import { Openlaw } from "openlaw";
// // OR import only `APIClient`
// import { APIClient } from "openlaw";
 
 
// /**
//  * CommonJS
//  */
 
// // require() for Node.js (or bundlers that support CommonJS-style modules)
import { Openlaw, APIClient } from './node_modules/openlaw';





import { APIClient } from "openlaw";
const { APIClient, Openlaw } = require('openlaw');
 
 
// /**
//  * Browser: available as a browser global: `openlaw`
//  */
// <script src="https://unpkg.com/openlaw/dist/umd/openlaw.js"></script>
 
//  <script>
//    const Openlaw = openlaw.Openlaw;
//    const APIClient = openlaw.APIClient;
//  </script>
 
 
/**
 * Browser, with ES Modules (https://caniuse.com/#search=Modules)
 */
 
// in your app

 
// then, in your HTML
<script type="module" src="./app.js"></script>
 
// Include the root URL for the OpenLaw instance.
apiClient = new APIClient('https://app.openlaw.io');
 
/*
Most of the APIClient method calls can only be made by a logged in
user with a StandardUser role or an Admin role. Log in before making
those calls.
*/
apiClient.login('openlawuser+1@gmail.com', 'password');
 
apiClient.getTemplate('Advisor Agreement').then(result => {
  console.log(result);
});
/*
{
  "id": "d76ede8ca437f6da06b1e09f115393318faf29fdc5bdaaf0b2e889886136edf4",
  "title": "Advisor Agreement",
  "content": "This Advisor Agreement is entered into between [[Company Name: Text]] (\"Corporation\") and [[Advisor Name]] (\"Advisor\") as of [[Effective Date: Date]] (\"Effective Date\"). Company and Advisor agree as follows:  \n\n^ **Services**. Advisor agrees to consult with and advise Company from time to time, at Company's request (the \"Services\"). {{No Services \"Do you want to limit the advisor's services?\"  While this Agreement is is effect, Advisor will not provide services to any company active in the field of [[Noncompete Field \"What field should the advisor not participate in?\"]].}}\n\n...**COMPANY:**\n[[Company Signatory Email: Identity]]\n\n___________________\nName:  [[Company Signatory]]\nAddress:  [[Company Address: Address]]\n\n\n**ADVISOR:**\n[[Advisor Email: Identity]]\n\n___________________\nName [[Advisor Name]]      \nAddress: [[Advisor Address: Address]]\n",
  "templateType": "agreement"
}
*/

import { Openlaw } from "openlaw";
 
const compiledTemplate = Openlaw.compileTemplate(
  'This Advisor Agreement is entered into between [[Company Name]] ("Corporation") and [[Advisor Name]] ("Advisor") as of [[Effective Date: Date]] ("Effective Date"). Company and Advisor agree as follows: \n\n^**Services**. Advisor agrees to consult with and advise Company from time to time, at Company\'s request (the "Services").'
);
 
console.log(compiledTemplate);
/*
{
  isError: false,
  errorMessage: "",
  compiledTemplate: CompiledTemplate
}
*/