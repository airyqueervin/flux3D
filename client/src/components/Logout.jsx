import React from 'react';

const Logout = ({showLogin}) => (
  <div id='container' className="ui container">
    {/*<!-- header -->*/}
    <div id='header'>
      <div id='title'>
        <h1>FLUX</h1>
        <h2>Seed Project</h2>
      </div>
      <div id='actions'>
        <div onClick={showLogin} id='logout'>logout</div>
      </div>
    </div>
  </div>
)

export default Logout;
