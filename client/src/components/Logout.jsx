import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectProjectValue: '',
      selectCellValue: ''
    }
  }

  handleProjectChange = (e) => {
    this.setState({selectProjectValue: e.target.value}, () => {
      this.props.getSelectedProject(JSON.parse(this.state.selectProjectValue))
    });
  }
  handleCellChange = (e) => {
    this.setState({selectCellValue: e.target.value}, () => {
      this.props.getSelectedCell(JSON.parse(this.state.selectCellValue))
    });
  }

  render() {
    return (
      <div id='container' className="ui container">
        {/*<!-- header -->*/}
        <div id='header'>
          <div id='title'>
            <h1>FLUX</h1>
            <h2>AE Project</h2>
          </div>
          <div id='actions'>
            <div className='select'>
              <select value={this.state.selectProjectValue} onChange={this.handleProjectChange} className='project'>
                <option value={JSON.stringify('projectDefault')}>Please select a project</option>
                {this.props.projects ? this.props.projects.map((project, i) => <option value={JSON.stringify(project)} key={i}>{project.name}</option>) : null}
              </select>
            </div>
            <div onClick={this.props.showLogin} id='logout'>logout</div>
          </div>
        </div>
        {/*<!-- content-->*/}
        <div id='content'>
          {/*<!-- left column -->*/}
          <div className='column'>
            <div id='output'>
              <div className='label'>From Flux</div>
              <div className='select'>
                <select value={this.state.selectCellValue} onChange={this.handleCellChange} className='cell'>
                  <option value={JSON.stringify('cellDefault')}>Please select a cell</option>
                  {this.props.cells ? this.props.cells.map((cell, i) => <option value={JSON.stringify(cell)} key={i}>{cell.label}</option>) : null}
                </select>
              </div>
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

export default Logout;
