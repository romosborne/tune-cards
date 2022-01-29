import React from 'react';
import Chords from './Chords';
import { Tune } from './types'

type TuneSummaryProps = {
  tune: Tune;
}

class TuneSummary extends React.Component<TuneSummaryProps> {
  render() {
    return (
      <div className="tuneSummary col border-end border-start">
        <h3 className="card-title">{this.props.tune.title}</h3>
        {
          this.props.tune.key && <div><strong>Key:</strong> {this.props.tune.key}</div>
        }
        {
          this.props.tune.chordsA &&
          <div>
            <Chords section="a" chords={this.props.tune.chordsA} />
          </div>
        }
        {
          this.props.tune.chordsB &&
          <div>
            <Chords section="b" chords={this.props.tune.chordsB} />
          </div>
        }
        {
          this.props.tune.chordsC &&
          <div>
            <Chords section="c" chords={this.props.tune.chordsC} />
          </div>
        }
        {
          this.props.tune.notes &&
          <p className="card-text">{this.props.tune.notes}</p>
        }

      </div>
    );
  }
}

export default TuneSummary;
