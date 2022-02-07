import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Chords.css';

type ChordsProps = {
  section: string;
  chords: string[];
}

class Chords extends React.Component<ChordsProps> {
  render() {
    return (
      <div className="chord-container">
        <Row xs={5} className="fs-5">
          <Col className="text-end">{this.props.section}:</Col>
          <Col><strong>{this.props.chords[0]}</strong></Col>
          <Col><strong>{this.props.chords[1]}</strong></Col>
          <Col><strong>{this.props.chords[2]}</strong></Col>
          <Col><strong>{this.props.chords[3]}</strong></Col>
          <Col></Col>
          <Col><strong>{this.props.chords[4]}</strong></Col>
          <Col><strong>{this.props.chords[5]}</strong></Col>
          <Col><strong>{this.props.chords[6]}</strong></Col>
          <Col><strong>{this.props.chords[7]}</strong></Col>
        </Row>
      </div>
    );
  }
}

export default Chords;
