import { Set } from './types'
import { load } from 'js-yaml'

const storage = {
  STORAGE_KEY: 'NozzySets',
  inflate(s: Set): Set {
    if (!s.title) {
      s.title = s.tunes.flatMap((t) => t.title).join(' + ')
    }

    if (!s.id) {
      if (s.title) {
        s.id = s.title.replace(/\W/g, '')
      } else {
        s.id = s.tunes
          .flatMap((t) => t.title)
          .join('')
          .replace(/\W/g, '')
      }
    }

    return s
  },
  async loadSets(skipCache = false): Promise<Set[]> {
    console.log('Trying to load sets')

    let local = localStorage.getItem(this.STORAGE_KEY)

    if (skipCache || local === null) {
      console.log("Loading from 'api'")

      const url =
        'https://raw.githubusercontent.com/romosborne/tune-cards/master/public/tunes.yaml'
      // const url = '/tunes.yaml'

      const response = await fetch(url)
      const text = await response.text()

      const sets = load(text) as Set[]

      const inflatedSets = sets.map((s) => this.inflate(s))

      return inflatedSets
    } else {
      console.log('Loading from storage')
      const sets = JSON.parse(local)
      return sets
    }
  },

  saveAll(setList: Set[]) {
    console.log('Saving sets to storage')
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(setList))
  },
}

export default storage
