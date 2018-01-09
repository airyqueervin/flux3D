import React from 'react';

const Login = ({login}) => (
  <div id='header'>
    <div id='actions'>
      <div onClick={login} id='logout'>Login</div>
    </div>
  </div>
)

export default Login;
