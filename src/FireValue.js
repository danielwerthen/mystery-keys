import React from 'react';
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

export default class FireValue extends React.Component {
  state = {
    hasValue: false,
    value: null,
  };
  componentDidMount() {
    this.ref = firebase.database().ref(this.props.path);
    this.listener = this.ref.on('value', snapshot => {
      this.setState({
        value: this.props.map(snapshot.val()),
        hasValue: true,
      });
    });
  }
  componentWillUnmount() {
    this.ref.off(this.listener);
  }
  render() {
    const { value, hasValue } = this.state;
    return hasValue ? this.props.children(value) : null;
  }
}

FireValue.defaultProps = {
  map: id => id,
};
