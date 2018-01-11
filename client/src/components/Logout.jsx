import React, {Component} from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: ''
    }
  }

  handleChange = (e) => {
    console.log('Selected value in handleChange', e.target.value)
    this.setState({selectValue: e.target.value}, () => {
      this.props.getSelectedProject(JSON.parse(this.state.selectValue))
    });
  }

  render() {
    console.log('Selected value:', this.state.selectValue)
    return (
      <div id='container' className="ui container">
        {console.log('projects in logout', this.props.projects)}
        {/*<!-- header -->*/}
        <div id='header'>
          <div id='title'>
            <h1>FLUX</h1>
            <h2>AE Project</h2>
          </div>
          <div id='actions'>
            <div className='select'>
              <select value={this.state.selectValue} onChange={this.handleChange} className='project'>
                <option value={JSON.stringify('default')}>Please select a project</option>
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
    );
  }
}

export default Logout;
