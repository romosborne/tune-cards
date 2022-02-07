import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import Chords from './Chords';
import { Tune } from './types'

type TuneSummaryProps = {
  tune: Tune;
}

class TuneSummary extends React.Component<TuneSummaryProps> {
  render() {
    return (
      <Col className="tuneSummary mb-2">
        <Row className="mb-1">
          <Col xs={2}>
            <Badge bg="secondary" className="p-2 fs-4">{this.props.tune.key}</Badge>
          </Col>
          <Col>
            <h3>{this.props.tune.title}</h3>
          </Col>
        </Row>
        {
          this.props.tune.chordsA &&
          <Chords section="a" chords={this.props.tune.chordsA} />
        }
        {
          this.props.tune.chordsB &&
          <Chords section="b" chords={this.props.tune.chordsB} />
        }
        {
          this.props.tune.chordsC &&
          <Chords section="c" chords={this.props.tune.chordsC} />
        }
        {
          this.props.tune.notes &&
          <p>{this.props.tune.notes}</p>
        }
      </Col>
    );
  }
}

export default TuneSummary;
