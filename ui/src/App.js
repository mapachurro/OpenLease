import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Client from "./Client";

import reactLogo from './images/react.svg';
import playLogo from './images/play.svg';
import scalaLogo from './images/scala.png';

import './App.css';

const Tech = ({ match }) => {
  return <div>Current Route: {match.params.tech}</div>
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  async componentDidMount() {
    Client.getSummary(summary => {
      this.setState({
        title: summary.content
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <h1 class="navbar-brand" href="#">OpenLease Project</h1>
            <div class="navbar justify-content-center" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <Link to="newlease" >
                    <img width="450" height="300" src={scalaLogo} alt="Scala Logo" />
                  </Link>
                  </li>
                  <Link to="login" >
                    <img width="400" height="400" src={playLogo} alt="Play Framework Logo" />
                  </Link>
                  <Link to="signup" >
                    <img width="400" height="400" src={reactLogo} className="App-logo" alt="React Logo" />
                  </Link>
                  </ul>
                  </div>
          </nav>
                <Route path="/:tech" component={Tech} />
                <div>
                  <h2>Check out the project on GitHub for more information</h2>
                  <h3>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/yohangz/scala-play-react-seed">
                      scala-play-react-seed
              </a>
                  </h3>
                </div>
        </div>
      </Router>
            );
          }
        }
        export default App;
