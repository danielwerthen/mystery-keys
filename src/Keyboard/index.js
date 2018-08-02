import React, { Component } from 'react';
import defaultTones from './tones';
import context from '../AudioContext';

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
    if (this.props.onKeyPress) {
      this.props.onKeyPress(this.props.frequency);
    }
    this.g.gain.exponentialRampToValueAtTime(1, context.currentTime + 0.1);
  };
  onMouseUp = () => {
    this.stop();
  };
  onMouseLeave = () => {
    this.stop();
  };
  render() {
    const isTouch = 'ontouchstart' in window;
    const { frequency, onKeyPress, ...rest } = this.props;
    return (
      <div
        {...rest}
        onTouchStart={isTouch ? this.onMouseDown : undefined}
        onTouchEnd={isTouch ? this.onMouseUp : undefined}
        onMouseDown={!isTouch ? this.onMouseDown : undefined}
        onMouseUp={!isTouch ? this.onMouseUp : undefined}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }
}

Key.defaultProps = {
  frequency: 440,
};

function isBlack(tone) {
  return tone.label.indexOf('#') > 0;
}

export default class Keyboard extends Component {
  render() {
    const { tones, onTonePress, octave } = this.props;
    return (
      <div className="keys">
        {tones.map((tone, id) => (
          <Key
            className={isBlack(tone) ? 'black' : 'white'}
            frequency={tone.freq * octave}
            key={id}
            onKeyPress={() => onTonePress && onTonePress(tone)}
          />
        ))}
      </div>
    );
  }
}

Keyboard.defaultProps = {
  tones: defaultTones,
  octave: 2,
};
