import React from 'stilren/react';
import tones from './Keyboard/tones';
var context = new AudioContext();

function createTone(frequency) {
  const o = context.createOscillator();
  const g = context.createGain();
  o.connect(g);
  g.connect(context.destination);
  o.frequency.value = frequency;
  g.gain.value = 0.0001;
  o.start();
  return {
    oscillator: o,
    gain: g,
    start() {
      g.gain.exponentialRampToValueAtTime(1, context.currentTime + 0.1);
    },
    stop() {
      g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.04);
    },
  };
}

function durationLookup(str) {
  switch (str) {
    case '1/8':
      return 500;
    case '1/4':
      return 1000;
    default:
      return 2000;
  }
}

export default class TunePlayer extends React.Component {
  state = { playing: false };
  componentWillMount() {
    if (!this.props.keySequence) {
      return;
    }
    this.keys = this.props.keySequence.map((note, idx) => {
      const match = tones.find(t => t.label === note);
      let tone;
      if (match) {
        tone = createTone(match.freq * this.props.octave);
      }
      const duration =
        durationLookup(this.props.rythm[idx] || '1/4') *
        this.props.durationMultiplier;
      return {
        tone,
        duration,
      };
    });
  }
  playPosition(idx) {
    const key = this.keys[idx];
    if (!key || !this.state.playing) {
      this.setState({
        playing: false,
      });
      return;
    }
    if (key.tone) {
      key.tone.start();
    }
    setTimeout(() => {
      if (key.tone) {
        key.tone.stop();
      }
      this.playPosition(idx + 1);
    }, key.duration);
  }
  onPress = () => {
    this.setState(
      state => ({
        playing: !state.playing,
      }),
      () => {
        if (this.state.playing) {
          this.playPosition(0);
        }
      }
    );
  };
  render() {
    return (
      <div>
        <button
          onClick={this.onPress}
          $width="125px"
          $height="48px"
          $margin="2em"
        >
          {this.state.playing ? 'Stop' : 'Play Hint'}
        </button>
      </div>
    );
  }
}

TunePlayer.defaultProps = {
  durationMultiplier: 0.8,
  rythm: [],
};
