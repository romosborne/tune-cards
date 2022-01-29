import React from 'react';
import './Chords.css';

type ChordsProps = {
  section: string;
  chords: string[];
}

class Chords extends React.Component<ChordsProps> {
  render() {
    return (
      <div className="chord-container">
    <div className="row row-cols-5">
      <div className="col col-1">{this.props.section}:</div>
      <div className="col">{this.props.chords[0]}</div>
      <div className="col">{this.props.chords[1]}</div>
      <div className="col">{this.props.chords[2]}</div>
      <div className="col">{this.props.chords[3]}</div>
      <div className="col col-1"></div>
      <div className="col">{this.props.chords[4]}</div>
      <div className="col">{this.props.chords[5]}</div>
      <div className="col">{this.props.chords[6]}</div>
      <div className="col">{this.props.chords[7]}</div>
    </div>
  </div>
    );
  }
}

export default Chords;
