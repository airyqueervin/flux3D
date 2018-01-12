import React from 'react';

const Login = ({ login }) => (
  <div style={{'display': 'flex'}} id="login">
    <div onClick={login} className="button">Login</div>
  </div>
)

export default Login;
