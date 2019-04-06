import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom"; 
import Login from "./components/pages/login";
import Newlease from "./components/pages/newlease.js";
import Overview from "./components/pages/overview.js";
import Previous from "./components/pages/previous.js";
import Signup from "./components/pages/signup.js"
import "./App.css"


function App() {

  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Overview} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />  
        <Route path="/new" component={Newlease} />
        <Route exact path="/previous" component = {Previous} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;