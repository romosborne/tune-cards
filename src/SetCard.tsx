import { title } from 'process';
import React from 'react';
import TuneSummary from './TuneSummary';
import { Metre, Set } from './types'

type SetCardProps = {
  set: Set;
  onDoneChange: (setId: string, value: boolean) => void
}

class SetCard extends React.Component<SetCardProps> {
  constructor(props: SetCardProps) {
    super(props);
    this.handleDoneToggle.bind(this);
  }

  displayMetre = () => {
    if (this.props.set.metre === Metre.Reel) {
      return "R";
    }
    if (this.props.set.metre === Metre.Jig) {
      return "J";
    }

    return "?";
  }

  displayTitle = () => {
    if (!this.props.set) return "";
    if (this.props.set.title) {
      return this.props.set.title;
    } else {
      return this.props.set.tunes.flatMap((a) => a.title).join(" + ");
    }
  }

  handleDoneToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onDoneChange(this.props.set.id, event.target.checked);
    console.log({ event });
  }

  render() {
    var header = <div className="row justify-content-between">
      <div className="col-1">
        <span className="badge rounded-pill bg-danger">{this.displayMetre()}</span>
      </div>
      <div className="col-10">
        <h1>{this.displayTitle()}</h1>
      </div>
      <div className="col-1">
        <div className="form-check">
          <input
            className="form-check-input ml-1"
            type="checkbox"
            checked={this.props.set.done}
            onChange={this.handleDoneToggle}
          />
        </div>
      </div>
      <hr />
    </div>

    var body = <div className="container">
      <div className="row">
        {
          this.props.set.tunes.map(t =>
            <TuneSummary tune={t} key={t.title} />)
        }
      </div>
      {
        this.props.set.tags && this.props.set.tags.length > 0 &&
        <div className="text-start">
          <strong>Tags: </strong>
          {
            this.props.set.tags.map(t =>
              <span
                className="badge rounded-pill bg-secondary"
                key={t}>
                {t}
              </span>)
          }
        </div>
      }
    </div>

    return (
      <div className="col mb-3">
        <div className='modal fade' id={'modalid-' + this.props.set.id}>
          <div className='modal-dialog modal-xl modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{this.displayTitle()}</h5>
              </div>
              <div className='modal-body'>
                {body}
              </div>
            </div>
          </div>
        </div>
        <div className="border bg-body p-3 rounded-3">
          {header}
          <div className="body">
            <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target={'#modalid-' + this.props.set.id}>
              Make big
            </button>
            {body}
          </div>
        </div>
      </div>
    );
  }
}

export default SetCard;
