import React from 'react';
import SetCard from './SetCard';
import { Metre, Set } from './types'

type SetGroupProps = {
  metre: Metre;
  sets: Set[];
  onDoneChange: (setId: string, value: boolean) => void
}

class SetGroup extends React.Component<SetGroupProps> {
  displayMetre(m: Metre) {
    switch (m) {
      case Metre.Jig: return "Jigs"
      case Metre.Reel: return "Reels"
      case Metre.Jig48: return "48-bar Jigs"
      case Metre.Reel48: return "48-bar Reels"
      case Metre.Waltz: return "Waltzes"
      case Metre.Square: return "Squares"
      default: return "Mystery!"
    }
  }

  render() {
    return (
      <div>
        <div className="sticky-top bg-light"><h1>{this.displayMetre(this.props.metre)}</h1></div>
        <div className='container'>
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-3">
          {
            this.props.sets.map((s) => <SetCard key={s.id} set={s} onDoneChange={this.props.onDoneChange} />)
          }
        </div>
      </div>
      </div>
    );
  }
}

export default SetGroup;
