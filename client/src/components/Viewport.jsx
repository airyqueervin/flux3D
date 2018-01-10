import React from 'react';
let viewport = new FluxViewport(document.querySelector("#view"))
const Viewport = () => (
  <div id='header'>
    <div id='actions'>
      <div onClick={login} id='logout'>Login</div>
    </div>
  </div>
)

export default Viewport;
