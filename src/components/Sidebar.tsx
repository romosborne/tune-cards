import { Button, Container, Offcanvas, Row } from 'react-bootstrap'
import { Set } from '../types'

const Sidebar = (props: {
  completedSets: Set[]
  newGig: () => void
  interval: () => void
}) => {
  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Something!</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container>
          <Row>
            <Button
              className="p-3 mb-4"
              variant="success"
              onClick={props.newGig}
            >
              🎵 Start a new gig 🎵
            </Button>
          </Row>
          <Row>
            <Button
              className="p-3 mb-4"
              variant="warning"
              onClick={props.interval}
            >
              Add Interval
            </Button>
          </Row>
          <Row>
            <h3>Played Tunes</h3>
          </Row>
          <ul>
            {props.completedSets.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </Container>
      </Offcanvas.Body>
    </>
  )
}

export default Sidebar
