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
