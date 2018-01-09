import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './styles.css';
import { helpers } from '../src/js/helpers.js';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import $ from 'jquery';


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
    $('#login').css('display', 'flex')
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
        that.hideLogin()
        // if logged in, make sure the login page is hidden
        // that.setState({loginVisible: false})
      } else {
        console.log('not logged in')
        this.showLogin();
        // this.setState({loginVisible: !this.state.loginVisible})
      }
    })
  }

  handleLoginClick = () => {
    // console.log(helpers)
    // this.init()
    helpers.redirectToFluxLogin()
      .then(() => {
        this.setState({loginVisible: false})
      })
  }

  render() {
    console.log('vis state', this.state.loginVisible)
    return (
      <div>
        <div classID='login'>
          {this.state.loginVisible ? <Login login={this.handleLoginClick} /> : <Logout showLogin={this.showLogin} />}
        </div>

    
        <div id='content'>
        {/*<!-- left column -->*/}
        <div className='column'>
          <div id='output'>
            <div className='label'>From Flux</div>
            {/*<!-- geometry viewport -->*/}
            <div id='geometry'>
              <div id='view'></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
