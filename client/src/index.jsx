import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: []
    };

  }

  getMessages = () => {
    setInterval(() => {
      axios.get('/api/message')
        .then(({ data }) => {
          this.setState({
            messages: data
          });
        })
        .catch(err => {
          console.error("Thing failed", err);
        });

    }, 300)
  }

  submitMessage = (message) => {
    axios.post('/api/message', {
      username: this.state.username,
      text: message
    })
    .then(({ data }) => {
      this.setState({
        messages: data
      });
    })
    .catch(err => {
      console.error("That other thing failed", err);
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome To Flux 3D!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
