import React, { useEffect, useRef } from 'react'
import { Accordion, Badge, Col, Row } from 'react-bootstrap'
import Chords from './Chords'
import { Tune } from '../types'
import abcjs from 'abcjs'
import { expandAbc } from '../utils/helpers'

type TuneSummaryProps = {
  tune: Tune
}

const TuneSummary = (p: { tune: Tune }) => {
  const tune = p.tune

  const abcEl = useRef(null)

  useEffect(() => {
    abcEl && tune.hint && abcjs.renderAbc(abcEl.current as any, expandAbc(tune))
  }, [abcEl])

  return (
    <Col className="tuneSummary mb-2">
      <span>
        <h3>
          <Badge bg="secondary" className="p-2 fs-4 mx-2">
            {tune.key}
          </Badge>
          {tune.title}
        </h3>
      </span>

      {tune.hint && (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Hint</Accordion.Header>
            <Accordion.Body>
              <div ref={abcEl} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}

      {tune.chordsA && <Chords section="a" chords={tune.chordsA} />}
      {tune.chordsB && <Chords section="b" chords={tune.chordsB} />}
      {tune.chordsC && <Chords section="c" chords={tune.chordsC} />}
      {tune.notes && <p>{tune.notes}</p>}
    </Col>
  )
}

export default TuneSummary
