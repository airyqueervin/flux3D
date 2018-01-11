import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './styles.css';
import { helpers, getCell, getCells, getDataTable, getProjects, getUser, getValue } from './js/helpers.js';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
// import $ from 'jquery';
import { box_data } from './js/box.js';
let viewport, selectedProject, projectCells, selectedOutputCell, that;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginVisible: true,
      userProject: '',
      stateProjects: '',
      stateCells: ''
    };

    this.init()
  }

  hideLogin = () => {
    this.setState({loginVisible: false});
  }
  showLogin = () => {
    helpers.logout();
    this.setState({loginVisible: true});
  }

  init = () => {
    that = this;
    helpers.storeFluxUser()
    .then(() => helpers.isLoggedIn())
    .then(isLoggedIn => {
      if (isLoggedIn) {
        that.hideLogin();
        that.initViewport();
        that.fetchProjects();
        viewport.setGeometryEntity(box_data);
      } else {
        that.showLogin();
      }
    })
  }

  initViewport = () => {
    viewport = new FluxViewport(document.querySelector("#view"));
    viewport.setSize(500, 500)
    viewport.setupDefaultLighting()
    // set the viewport background to white
    // viewport.setClearColor(0xffffff)
  }

  handleLoginClick = () => {
    helpers.redirectToFluxLogin()
      .then(() => {
        this.setState({loginVisible: false})
      })
  }

  renderData = (data) => {
    if(!data){
      viewport.setGeometryEntity(null)
    } else if (FluxViewport.isKnownGeom(data.value)) {
      viewport.setGeometryEntity(data.value)
    } else {
      viewport.setGeometryEntity(data.value)
    }
  }

  fetchCells = () => {
    that = this;
    getCells(selectedProject)
      .then((data) => {
        projectCells = data.entities
        that.setState({stateCells: data.entities}, () => {
          that.renderData(null)
        })
    })
  }

  getSelectedProject = (currProject) => {
    selectedProject = currProject
    this.fetchCells()
  }

  getSelectedCell = (currCell) => {
    that = this;
    projectCells = currCell
    if (selectedProject && projectCells) {
      getValue(selectedProject, projectCells)
        .then((data) => {
        that.renderData(data);
      })
    }
  }

  fetchProjects = () => {
    that = this;
    getProjects()
      .then((data) => {
        that.setState({stateProjects: data.entities})
    })

  }

  render() {
    return this.state.loginVisible ? <Login login={this.handleLoginClick} /> : <Logout getSelectedProject={this.getSelectedProject} getSelectedCell={this.getSelectedCell} projects={this.state.stateProjects} cells={this.state.stateCells} showLogin={this.showLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
