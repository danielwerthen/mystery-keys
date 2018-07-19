import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TuneValidator from './TuneValidator';
var firebase = require('firebase/app');

require('firebase/database');

var config = {
  apiKey: 'AIzaSyDdwZI7dTK9Lu8i6euR37qcVmxhNepHn-E',
  authDomain: 'mysterium-47ec6.firebaseapp.com',
  databaseURL: 'https://mysterium-47ec6.firebaseio.com',
  projectId: 'mysterium-47ec6',
  storageBucket: '',
  messagingSenderId: '865064866842',
};
firebase.initializeApp(config);

var starCountRef = firebase.database().ref('daniel');
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val());
});

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
        <TuneValidator compareWith={['F', 'G', 'A']} onValid={console.log} />
      </div>
    );
  }
}

export default App;
