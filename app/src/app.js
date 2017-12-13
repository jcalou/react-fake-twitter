import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

class App extends React.Component {

  render() {

    return (
      <div>
        Fake twitter app
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
