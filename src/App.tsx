import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import storage from './utils/storage'
import { Metre, Set } from './types'
import SetGroup from './components/SetGroup'
import { Container, Navbar, Spinner } from 'react-bootstrap'
import Sidebar from './components/Sidebar'

const App = () => {
  const [sets, setSets] = useState<Set[]>([])
  const [completedSets, setCompletedSets] = useState<Set[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const sets = await storage.loadSets()
      setSets(sets)
      setLoading(false)
    }

    loadData().catch(console.error)
  }, [])

  const clearCache = async () => {
    console.log('Clearing cache')
    const sets = await storage.loadSets(true)
    setSets(sets)
    setCompletedSets([])
  }

  const handleDoneChange = (setId: string, value: boolean) => {
    const set = sets.find((s) => s.id === setId)

    if (set) setCompletedSets((cs) => [...cs, set])

    const newSets = sets.map((s) => {
      if (s.id === setId) s.done = value
      return s
    })
    setSets(newSets)
  }

  const groupedSets = () => {
    var map = new Map<Metre, Set[]>()
    sets.forEach((s: Set) => {
      const key = s.metre
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [s])
      } else {
        collection.push(s)
      }
    })
    return map
  }

  const addInterval = () => {
    console.log('adding interval')
    setCompletedSets((cs) => [
      ...cs,
      {
        id: 'interval',
        done: true,
        title: 'Interval',
        metre: Metre.Reel,
        tunes: [],
      },
    ])
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
          Array.from(groupedSets()).map(([m, s]) => (
            <SetGroup
              key={m}
              metre={m}
              sets={s}
              onDoneChange={handleDoneChange}
            />
          ))}
      </div>
    </>
  )
}

export default App
