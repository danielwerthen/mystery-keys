import React, { Component } from 'react';
import Keyboard from './Keyboard';

export default class TuneValidator extends Component {
  state = { history: [] };
  tonePress = tone => {
    const { compareWith, onValid = () => void 0 } = this.props;
    this.setState(({ history }) => {
      const idx = history.length;
      if (compareWith[idx] === tone.label) {
        const newHistory = [...history, tone.label];
        if (compareWith.length <= idx + 1) {
          onValid(newHistory);
        }
        return {
          history: newHistory,
        };
      }
      return {
        history: [],
      };
    });
  };
  render() {
    return <Keyboard {...this.props} onTonePress={this.tonePress} />;
  }
}