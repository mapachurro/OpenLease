// import React from 'react';
// import ReactDOM from 'react-dom';
// import { APIClient, Openlaw } from 'openlaw';
// import OpenLawForm from 'openlaw-elements';
// // our optional base styles - feel free to use them!
// import 'openlaw-elements/dist/openlaw-elements.min.css';
 
// // OpenLaw APIClient: https://docs.openlaw.io/api-client/#authentication
// //  - used to fetch geo data in our `Address` field type
// //  - to run against your own private OpenLaw instance: 'https://[YOUR.INSTANCE.URL]';
// const apiClient = new APIClient('https://app.openlaw.io');
// // we strongly recommend using environment variables, not hard-coded strings
// apiClient.login('oliver.renwick@gmail.com', 'Palabra12');
 
// // https://docs.openlaw.io/openlaw-object/#compiletemplate
// const { compiledTemplate } = Openlaw.compileTemplate('**Name**: [[First Name]] [[Last Name]]');
// // https://docs.openlaw.io/openlaw-object/#execute
// const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, {});
// // https://docs.openlaw.io/openlaw-object/#getexecutedvariables
// const variables = Openlaw.getExecutedVariables(executionResult, {});
// // typically the parameters object will be updated in state via 
// // an `onChangeFunction` handler (or in a state manager like Redux
// // or MobX) throughout the lifetime of the app
// const parameters = {};
 
// // helpful for logging in development, or throwing exceptions at runtime
// if (errorMessage) {
//   console.error('Openlaw Execution Error:', errorMessage);
// }
 
// const onChange = (key, value) => console.log('KEY:', key, 'VALUE:', value);
 
// const App = () => (
//   <OpenLawForm
//     apiClient={apiClient}
//     executionResult={executionResult}
//     parameters={parameters}
//     onChangeFunction={onChange}
//     // https://docs.openlaw.io/openlaw-object/
//     openLaw={Openlaw}
//     variables={variables}
//   />
// );
 
// ReactDOM.render(<App />, document.getElementById('your-id-here'));