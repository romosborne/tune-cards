import { useEffect, useState } from 'react'
import SetGroup from './SetGroup'
import storage from './storage'
import { Metre, Set } from './types'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { Button } from 'react-bootstrap'

const App = () => {
  const [sets, setSets] = useState<Set[]>([])
  useEffect(() => {
    const loadData = async () => {
      const sets = await storage.loadSets()
      setSets(sets)
    }

    loadData().catch(console.error)
  }, [])

  const clearCache = async () => {
    const sets = await storage.loadSets(true)
    setSets(sets)
  }

  const handleDoneChange = (setId: string, value: boolean) => {
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

  return (
    <div className="App">
      <h1 className="px-4 py-5 text-center">Tunes for Nozzy!</h1>
      <Button className="p-3 mb-4" variant="success" onClick={clearCache}>
        🎵 Start a new gig 🎵
      </Button>
      {Array.from(groupedSets()).map(([m, s]) => (
        <SetGroup key={m} metre={m} sets={s} onDoneChange={handleDoneChange} />
      ))}
    </div>
  )
}

export default App
