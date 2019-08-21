import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Login from "./components/pages/login";
import createNew from "./components/pages/createNew";
import Newlease from "./components/pages/newlease";
import Overview from "./components/pages/overview.js";
import Previous from "./components/pages/previous.js";
import Signup from "./components/pages/signup.js"
import "./components/pages/newRlease"
// import Autofill from "./components/pages/autofill.js"


function App() {

  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Overview} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/newRlease" />  
        <Route path="/new" component={Newlease} />
        <Route path="/createnew" component={createNew} />
        <Route exact path="/previous" component = {Previous} />
        {/* <Route exact path="/autofill" component = {Autofill} /> */}
      </Switch>
    </Router>
  );
}

export default App;