import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';
import { helpers } from './js/helpers.js';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import $ from 'jquery';
import { box_data } from './js/box.js';
let viewport;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginVisible: true
    };

    this.init()

  }

  componentDidMount() {
    // this.setState({loginVisible: false})
  }
  

  hideLogin = () => {
    this.setState({loginVisible: false});
  }
  showLogin = () => {
    helpers.logout();
    this.setState({loginVisible: true});
  }

  init = () => {
    const that = this;
  // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
  // check that the user is logged in, otherwise show the login page
    .then(function() { return helpers.isLoggedIn() })
    .then(function(isLoggedIn) {
      if (isLoggedIn) {
        console.log('logged in')
        that.hideLogin();
        that.initViewport();
        viewport.setGeometryEntity(box_data);
      } else {
        console.log('not logged in')
        that.showLogin();
      }
    })
  }

  initViewport = () => {
    // attach the viewport to the #div view
    viewport = new FluxViewport(document.querySelector("#test"))
    // set up default lighting for the viewport
    console.log('VIEW PORT', viewport)
    viewport.setupDefaultLighting()
    // set the viewport background to white
    viewport.setClearColor(0xffffff)
  }

  handleLoginClick = () => {
    helpers.redirectToFluxLogin()
      .then(() => {
        this.setState({loginVisible: false})
      })
  }

  render() {
    console.log('vis state', this.state.loginVisible)
    return (
      <div className="container">
        <div classID='login'>
          {this.state.loginVisible ? <Login login={this.handleLoginClick} /> : <Logout showLogin={this.showLogin} />}
        </div>
          <br/>
          <br/>
        <div id='test'>
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
