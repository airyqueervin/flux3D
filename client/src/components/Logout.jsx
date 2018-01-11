import React from 'react';

const Logout = ({ showLogin }) => (
  <div id='container' className="ui container">
    {/*<!-- header -->*/}
    <div id='header'>
      <div id='title'>
        <h1>FLUX</h1>
        <h2>AE Project</h2>
      </div>
      <div id='actions'>
        <div className='select'><select className='project'></select></div>
        <div onClick={showLogin} id='logout'>logout</div>
      </div>
    </div>
    {/*<!-- content-->*/}
    <div id='content'>
      {/*<!-- left column -->*/}
      <div className='column'>
        <div id='output'>
          <div className='label'>From Flux</div>
          {/*<!-- geometry viewport -->*/}
          <div id='geometry'>
            <div id='view'></div>
          </div>
          <div className='select'><select className='cell'></select></div>
        </div>
      </div>
    </div>
  </div>
)

export default Logout;
