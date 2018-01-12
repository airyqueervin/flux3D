import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './styles.css';
import { helpers, getCell, getCells, getDataTable, getProjects, getUser, getValue } from './js/helpers.js';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
// import $ from 'jquery';
import { box_data } from './js/box.js';
import * as THREE from 'three';

let viewport, selectedProject, projectCells, selectedOutputCell, that, camera;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginVisible: true,
      userProject: '',
      stateProjects: '',
      stateCells: '',
      renderer: ''
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
    // camera = new FluxCameras(500, 500)
    // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.setState({renderer: viewport._renderer}, () => {
      console.log('renders state after setstate', this.state.renderer)
      console.log('GL CANVAS-------*******', viewport.getGlCanvas().getContext('webgl').render)
    })
    console.log('Whole Viewport in viewport', viewport)
    // console.log('camer in viewport', viewport)
    // viewport.setupDefaultLighting()
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
          console.log('Data in cell', data)
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
    return this.state.loginVisible ? <Login login={this.handleLoginClick} /> : <Logout renderer={this.state.renderer} getSelectedProject={this.getSelectedProject} getSelectedCell={this.getSelectedCell} projects={this.state.stateProjects} cells={this.state.stateCells} showLogin={this.showLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
