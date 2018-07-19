import React, { Component } from 'react';
import './App.css';
import ViewManager from './ViewManager';
import { StilrenProvider } from 'stilren/react';
import { Client } from 'styletron-engine-atomic';

const styletron = new Client();

class App extends Component {
  render() {
    return (
      <StilrenProvider styletron={styletron}>
        <div className="App">
          <ViewManager />
        </div>
      </StilrenProvider>
    );
  }
}

export default App;
