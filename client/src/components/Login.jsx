import React from 'react';

const loginStyle = {
  'top': '0',
  'position': 'absolute',
  'height': '100%',
  'width': '100%',
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
  'WebkitBoxAlign': 'center',
  'WebkitBoxPack': 'center',
  'background': '#e8e8e8',
  'zIndex': '10000',
  'display': 'none'
}
const Login = ({login}) => (
  <div className="row" id='header'>
    <div className="col-sm-4" id='actions'>
      <div onClick={login} id='logout'>Login</div>
    </div>
  </div>
)

export default Login;
