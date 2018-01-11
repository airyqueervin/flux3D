import React, {Component} from 'react';

const Logout = ({ showLogin, projects, getSelectedProject }) => (
  <div id='container' className="ui container">
    {console.log('projects in logout', projects)}
    {/*<!-- header -->*/}
    <div id='header'>
      <div id='title'>
        <h1>FLUX</h1>
        <h2>AE Project</h2>
      </div>
      <div id='actions'>
        <div className='select'>
          <select onChange={getSelectedProject} className='project'>
            <option>Please select a project</option>
            {projects ? projects.map((project, i) => <option value={project} key={i}>{project.name}</option>) : null}
          </select>
        </div>
        <div onClick={showLogin} id='logout'>logout</div>
      </div>
    </div>
    {/*<!-- content-->*/}
    <div id='content'>
      {/*<!-- left column -->*/}
      <div className='column'>
        <div id='output'>
          <div className='label'>From Flux</div>
          <div className='select'>
            <select className='cell'></select>
          </div>
          {/*<!-- geometry viewport -->*/}
          <div id='geometry'>
            <div id='view'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Logout;
