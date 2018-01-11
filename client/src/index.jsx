import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './styles.css';
import { helpers, getCell, getCells, getDataTable, getProjects, getUser, getValue } from './js/helpers.js';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import $ from 'jquery';
import { box_data } from './js/box.js';
let viewport, projects, selectedProject, projectCells, selectedOutputCell, that;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginVisible: true,
      userProject: [],
      stateProjects: []
    };

    this.init()

  }

  hideLogin = () => {
    this.setState({loginVisible: false});
  }
  showLogin = () => {
    helpers.logout();
    // $('#login').css('display', 'flex')
    this.setState({loginVisible: true});
  }

  init = () => {
    that = this;
    // Check if we're coming back from Flux with the login credentials.
    helpers.storeFluxUser()
    // check that the user is logged in, otherwise show the login page
    .then(() => helpers.isLoggedIn())
    .then(isLoggedIn => {
      if (isLoggedIn) {
        that.hideLogin();
        that.initViewport();
        that.fetchProjects();
        that.initCells();
        viewport.setGeometryEntity(box_data);
      } else {
        that.showLogin();
      }
    })
  }

  initViewport = () => {
    // attach the viewport to the #div view
    viewport = new FluxViewport(document.querySelector("#view"));
    console.log('VIEWPORT', viewport)
    // set up default lighting for the viewport
    viewport.setSize(500, 500)
    viewport.setupDefaultLighting()
    // set the viewport background to white
    // viewport.setClearColor(0xffffff)
  }

  initCells = () => {
    that = this;
    // attach a function to the change event of the viewport's cell (key) select box
    $('#output select.cell').on('change', function(e) {
      // find the cell that was clicked on
      selectedOutputCell = projectCells.filter(function(k) { return k.id === e.target.value })[0]
      
      if (selectedProject && selectedOutputCell) {
        // get the value of the cell (returns a promise)
        getValue(selectedProject, selectedOutputCell)
          .then((data) => {
          // and render it
            that.renderData(data);
        })
      }
    })
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
    } else {
      console.log('DatA THAT IS NOT A BOX', data.value)
      viewport.setGeometryEntity(data.value)
       .then(res => {
         console.log('RESULT', res);
       })

    }
  }

  fetchCells = () => {
    that = this;
    // get the project's cells (keys) from flux (returns a promise)
    getCells(selectedProject).then(function(data) {
      console.log('DATA IN FETCH CELLS', data)
      // assign the cells to the global constiable 'projectCells'
      projectCells = data.entities
      // for each project, create an option for the select box with
      // the cell.id as the value and the cell.label as the label
      let options = projectCells.map(function(cell) {
        return $('<option>').val(cell.id).text(cell.label)
      })
      // insert the default text as the first option
      options.unshift('<option>Please select a cell</option>')
      // make sure the select box is empty and then insert the new options
      $('select.cell').empty().append(options)
      //clear the display by rendering with null data
      that.renderData(null)
    })
  }

  getSelectedProject = (currProject) => {
    selectedProject = currProject
    console.log('GETSELECTPROJECT CALLED', selectedProject)
  }

  fetchProjects = () => {
    that = this;
    // get the user's projects from flux (returns a promise)
    getProjects()
      .then((data) => {
        projects = data.entities
        console.log('data in fetchProjects:', data)
        that.setState({stateProjects: data.entities})
        // for each project, create an option for the select box with
        // the project.id as the value and the project.name as the label
        // let options = projects.map(function(project) {
        //   return $('<option>').val(project.id).text(project.name)
        // })
        // insert the default text as the first option
      //   options.unshift('<option>Please select a project</option>')
      //   // make sure the select box is empty and then insert the new options
      //   $('select.project').empty().append(options)
      //   // empty out the project cell (key) select boxes
      //   $('select.cell').empty()
      //   // attach a function to the select box change event
      //   $('select.project').on('change', function(e) {
      //   // find the project that was clicked on, and assign it to the global
      //   // variable 'selectedProject'
      //   selectedProject = projects.filter(function(p) { return p.id === e.target.value })[0]
        
      //   // now go fetch the project's cells (keys)
      //   that.fetchCells()
      // })
    })

  }

  render() {
    return this.state.loginVisible ? <Login login={this.handleLoginClick} /> : <Logout getSelectedProject={this.getSelectedProject} projects={this.state.stateProjects} showLogin={this.showLogin} />
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
