import React from 'react'
import SetModal from './SetModal'
import { Instrument, Set } from './types'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

type SetCardProps = {
  set: Set
  onDoneChange: (setId: string, value: boolean) => void
}

type SetCardState = {
  showModal: boolean
}

class SetCard extends React.Component<SetCardProps, SetCardState> {
  constructor(props: SetCardProps) {
    super(props)
    this.state = { showModal: false }
  }

  displayInstrument = () => {
    if (this.props.set.instrument === Instrument.Flute) return '🎺'
    if (this.props.set.instrument === Instrument.Fiddle) return '🎻'
  }

  displayTitle = () => {
    if (!this.props.set) return ''
    if (this.props.set.title) {
      return this.props.set.title
    } else {
      return this.props.set.tunes.flatMap((a) => a.title).join(' + ')
    }
  }

  markSetDone = () => {
    console.log('Setting set done')
    this.props.onDoneChange(this.props.set.id, true)
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <Col className="mb-3">
        <SetModal
          set={this.props.set}
          visible={this.state.showModal}
          close={this.closeModal}
        />
        <div className="border bg-body p-3 rounded-3">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Button variant="success" onClick={this.showModal}>
              <i className="bi bi-zoom-in" />
            </Button>
            <h1>{this.displayTitle()}</h1>
            <Button variant="danger" onClick={this.markSetDone}>
              <i className="bi bi-x-square" />
            </Button>
          </div>
          <div className="d-flex w-100">
            {this.props.set.fav && <div>⭐</div>}
            {this.props.set.tags && this.props.set.tags.length > 0 && (
              <div>
                {this.props.set.tags.map((t) => (
                  <span className="badge bg-secondary mx-1" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {this.props.set.instrument && (
              <div className="ms-auto">{this.displayInstrument()}</div>
            )}
          </div>
        </div>
      </Col>
    )
  }
}

export default SetCard
