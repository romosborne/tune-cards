import React from 'react'
import TuneSummary from './TuneSummary'
import { Set } from './types'
import Modal from 'react-bootstrap/Modal'

type SetModalProps = {
  set: Set
  visible: boolean
  close: () => void
}

class SetModal extends React.Component<SetModalProps> {
  displayTitle = () => {
    if (!this.props.set) return ''
    if (this.props.set.title) {
      return this.props.set.title
    } else {
      return this.props.set.tunes.flatMap((a) => a.title).join(' + ')
    }
  }

  render() {
    return (
      <div className="modal fade" id={'modalid-' + this.props.set.id}>
        <Modal
          size="lg"
          centered={true}
          show={this.props.visible}
          onHide={this.props.close}
        >
          <Modal.Header>
            <h3 className="modal-title">{this.displayTitle()}</h3>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              {this.props.set.tunes.map((t) => (
                <div className="row" key={t.title}>
                  <TuneSummary tune={t} />
                  <hr />
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default SetModal
