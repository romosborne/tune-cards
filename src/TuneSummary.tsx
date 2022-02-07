import React from 'react';
import { Col } from 'react-bootstrap';
import Chords from './Chords';
import { Tune } from './types'

type TuneSummaryProps = {
  tune: Tune;
}

class TuneSummary extends React.Component<TuneSummaryProps> {
  render() {
    return (
      <Col className="tuneSummary">
        <h3 className="card-title">{this.props.tune.title}</h3>
        <div className='border'>{this.props.tune.key}</div>
        
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
          <p className="card-text">{this.props.tune.notes}</p>
        }
      </Col>
    );
  }
}

export default TuneSummary;
