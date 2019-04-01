import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Newlease from "./components/pages/newlease.js";
import Overview from "./components/pages/overview.js";
import Previous from "./components/pages/previous.js";
import Signup from "./components/pages/signup.js"
import Head from "./components/head"


function App() {
  return (
    <Router>
      <div>
        <Head/>
        <Route exact path="/" component={Overview} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/new" component={Newlease} />
        <Route path="/previous" component={Previous}/>
      </div>
    </Router>
  );
}

export default App;