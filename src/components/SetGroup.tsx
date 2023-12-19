import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import SetCard from './SetCard'
import { Metre, Set } from '../types'
import './SetGroup.css'

type SetGroupProps = {
  metre: Metre
  sets: Set[]
  onDoneChange: (setId: string, value: boolean) => void
}

class SetGroup extends React.Component<SetGroupProps> {
  displayMetre(m: Metre) {
    switch (m) {
      case Metre.Jig:
        return 'Jigs'
      case Metre.Reel:
        return 'Reels'
      case Metre.Jig48:
        return '48-bar Jigs'
      case Metre.Reel48:
        return '48-bar Reels'
      case Metre.SlipJig:
        return 'Slip Jigs'
      case Metre.Waltz:
        return 'Waltzes'
      case Metre.Square:
        return 'Squares'
      default:
        return 'Mystery!'
    }
  }

  render() {
    return (
      <div>
        <h1 className="p-2 mb-3 sticky-top bg-medium">
          {this.displayMetre(this.props.metre)}
        </h1>
        <Container>
          <Row xs={1} lg={2} xxl={3}>
            {this.props.sets.map((s) => (
              <SetCard
                key={s.id}
                set={s}
                onDoneChange={this.props.onDoneChange}
              />
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}

export default SetGroup
