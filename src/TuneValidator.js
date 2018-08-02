import React, { Component } from 'react';
import Keyboard from './Keyboard';
import TunePlayer from './TunePlayer';

export default class TuneValidator extends Component {
  state = { history: [] };
  tonePress = tone => {
    const { keySequence, onValid = () => void 0 } = this.props;
    this.setState(({ history }) => {
      const idx = history.length;
      if (keySequence[idx] === tone.label) {
        const newHistory = [...history, tone.label];
        if (keySequence.length <= idx + 1) {
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
    return (
      <React.Fragment>
        <Keyboard {...this.props} onTonePress={this.tonePress} />
        <TunePlayer {...this.props} />
      </React.Fragment>
    );
  }
}
