import React, { Component } from 'react';
// import THREE from 'three';
import * as THREE from 'three';
let projector;
let INTERSECTED;

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let scene = new THREE.Scene()
let renderer = new THREE.WebGLRenderer({
  antialias: true
});


console.log('Global Renderer', renderer.domElement)

function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


window.addEventListener( 'mousemove', onMouseMove, false );




class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectProjectValue: '',
      selectCellValue: '',
      viewport: '',
      x: 0, 
      y: 0
    }

    // this.handleRaycaster()
  }

  componentDidMount() {
    document.getElementById('view2').appendChild( renderer.domElement );
    window.requestAnimationFrame(this.rayRender);
  }

  componentWillReceiveProps() {
    if (this.props.renderer) {
      console.log('render prop', this.props.renderer)
      console.log('render camera', this.props.renderer._cameras._perspCamera)
      console.log('view div', document.getElementById('view'))

      camera = this.props.renderer._cameras._perspCamera;
      scene = this.props.renderer._scene;
      console.log('**********SCENE*********', scene)
    }
    
    // this.setState({viewport: this.props.viewport}, () => {
    // console.log('viewport state in logout', this.state.viewport)
    // })
  //   let scene = new THREE.Scene()
  //   let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  //   // create a Ray with origin at the mouse position
  //   //   and direction into the scene (camera direction)
  //   let vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
  //   // projector.unprojectVector( vector, camera );
  //   let ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

  //   // create an array containing all objects in the scene with which the ray intersects
  //   let intersects = ray.intersectObjects( scene.children );
  //   console.log('Logout View Stuff', scene, camera, vector, ray, intersects)

  //   // INTERSECTED = the object in the scene currently closest to the camera 
  //   //      and intersected by the Ray projected from the mouse position    

  //   // if there is one (or more) intersections
  //   if ( intersects.length > 0 )
  //   {
  //       // if the closest object intersected is not the currently stored intersection object
  //       if ( intersects[ 0 ].object != INTERSECTED )
  //       {
  //           // restore previous intersection object (if it exists) to its original color
  //           if ( INTERSECTED )
  //               INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
  //           // store reference to closest object as current intersection object
  //           INTERSECTED = intersects[ 0 ].object;
  //           // store color of closest object (for later restoration)
  //           INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
  //           // set a new color for closest object
  //           INTERSECTED.material.color.setHex( 0xffff00 );
  //       }
  //   }
  //   else // there are no intersections
  //   {
  //       // restore previous intersection object (if it exists) to its original color
  //       if ( INTERSECTED )
  //           INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
  //       // remove previous intersection object reference
  //       //     by setting current intersection object to "nothing"
  //       INTERSECTED = null;
  //   }
  }

  rayRender = () => {
    console.log("in heeeeRE")
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera);
  
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );
  
    for ( var i = 0; i < intersects.length; i++ ) {
  
      intersects[ i ].object.material.color.set( 0xff0000 );
  
    }
  
    // renderer.render( scene, camera );
  
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

  _onMouseMove = (e) => {
    this.rayRender()
    this.setState({ x: e.screenX, y: e.screenY });
  }
  
  render() {
    const { x, y } = this.state;
    console.log('viewport in logout', this.props.viewport)
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
              <div id="view2"></div>
              <div id='geometry'>
                <div onMouseMove={this._onMouseMove} id='view'>
                  <h1>Mouse coordinates: { x } { y }</h1>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Logout;
