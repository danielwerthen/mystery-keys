import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var context = new AudioContext();

class Key extends Component {
  componentWillMount() {
    const o = context.createOscillator();
    const g = context.createGain();
    o.connect(g);
    g.connect(context.destination);
    o.frequency.value = this.props.frequency;
    g.gain.value = 0.0001;
    o.start();
    this.o = o;
    this.g = g;
  }
  componentWillUnmount() {
    this.stop();
    if (this.o) {
      this.o.stop();
    }
  }
  stop() {
    if (!this.g) {
      return;
    }
    this.g.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + 0.04
    );
  }
  onMouseDown = () => {
    this.g.gain.exponentialRampToValueAtTime(1, context.currentTime + 0.1);
  };
  onMouseUp = () => {
    this.stop();
  };
  onMouseLeave = () => {
    this.stop();
  };
  render() {
    const { frequency, ...rest } = this.props;
    return (
      <div
        {...rest}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }
}

Key.defaultProps = {
  frequency: 440,
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="keys">
          <Key className="white" frequency={261.6} />
          <Key className="black" frequency={277.2} />
          <Key className="white" frequency={293.7} />
          <Key className="black" frequency={311.1} />
          <Key className="white" frequency={329.6} />
        </div>
      </div>
    );
  }
}

export default App;
