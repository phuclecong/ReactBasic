import React, { Component } from 'react';
import './style.css';
import Welcome from './../welcome';
import Clock from './../clock';
import Toggle from './../toggle';

class App extends Component {
  render() {
    return (
      <div className="app">
          {/* <Welcome name="aaa" /> */}
          {/* <Welcome name="bbb" /> */}
          {/* <Clock /> */}
          <Toggle />
      </div>
    );
  }
}

export default App;
