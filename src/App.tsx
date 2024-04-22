/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Metre, Set } from './types'
import SetGroup from './components/SetGroup'
import { Container, Navbar, Spinner } from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import { loadSets } from './utils/storage'
import { useStickyState } from './utils/hooks'
import { groupBy } from './utils/helpers'

const App = () => {
  const [sets, setSets] = useState<Set[]>([])
  const [completedSets, setCompletedSets] = useStickyState<Set[]>(
    [],
    'CompletedSets'
  )
  const [groupedPendingSets, setGroupedPendingSets] = useState<Record<
    Metre,
    Set[]
  > | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const sets = await loadSets()
      setSets(sets)
      setLoading(false)
    }

    loadData().catch(console.error)
  }, [])

  const clearCache = async () => {
    const sets = await loadSets(true)
    setSets(sets)
    setCompletedSets([])
  }

  useEffect(() => {
    const completedSetIds = completedSets.map((s) => s.id)
    const pendingSets = sets.filter((s) => !completedSetIds.includes(s.id))
    const groups = groupBy(pendingSets, (s) => s.metre)
    setGroupedPendingSets(groups)
  }, [sets, completedSets])

  const handleDoneChange = (setId: string) => {
    const set = sets.find((s) => s.id === setId)

    if (set) setCompletedSets((cs) => [...cs, set])
  }

  const addInterval = () => {
    setCompletedSets((cs) => {
      const count = cs.filter((s) => s.title === 'Interval').length
      return [
        ...cs,
        {
          id: `interval${count + 1}`,
          title: 'Interval',
          metre: Metre.Reel,
          tunes: [],
        },
      ]
    })
  }

  return (
    <>
      <Navbar expand={false}>
        <Container>
          <Navbar.Toggle />
          <Navbar.Brand>Tunes for Nozzy!</Navbar.Brand>
          <Navbar.Offcanvas>
            <Sidebar
              completedSets={completedSets}
              newGig={clearCache}
              interval={addInterval}
            />
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <div className="App">
        {loading && <Spinner />}
        {!loading &&
          groupedPendingSets &&
          Object.entries(groupedPendingSets).map(([m, s]) => (
            <SetGroup
              key={m}
              metre={m as Metre}
              sets={s}
              onDoneChange={handleDoneChange}
            />
          ))}
      </div>
    </>
  )
}

export default App
