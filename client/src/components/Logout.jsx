import React from 'react';

const containerStyle = {
  'display': 'flex',
  'flexDirection': 'column',
 ' maxWidth': '100% !important',
  'width': '60%',
  'height': '80%',
  'zIndex': '1000',
 ' borderRadius': '4px',
  'boxShadow': '0 1px 8px 1px #bbb',
  'background': 'white',
  'transition': 'height 0.5s'
}

const headerStyle = {
  'minHeight': '8.5em',
  'background': '#0fbfd6',
  'display': 'flex',
  'boxSizing': 'border-box'
}
const Logout = ({showLogin}) => (
  <div style={containerStyle} id='container' className="ui container">
    {/*<!-- header -->*/}
    <div style={headerStyle} id='header'>
      <div id='title'>
        <h1>FLUX</h1>
        <h2>AE Project</h2>
      </div>
      <div id='actions'>
        <div onClick={showLogin} id='logout'>logout</div>
      </div>
    </div>
    <div id='content'>
      {/*<!-- left column -->*/}
      <div className='column'>
        <div id='output'>
          <div className='label'>From Flux</div>
          {/*<!-- geometry viewport -->*/}
          <div id='geometry'>
            <br/>
            <br/>
            <br/>
            <div id='view'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Logout;
