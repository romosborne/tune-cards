import { Set } from '../types'
import { load } from 'js-yaml'

const storage = {
  STORAGE_KEY: 'NozzySets',
  inflate(s: Set): Set {
    if (!s.title) {
      s.title = s.tunes.flatMap((t) => t.title).join(' + ')
    }

    if (s.metre) {
      s.tunes = s.tunes.map((t) => ({ ...t, metre: s.metre }))
    } else {
      const metres = s.tunes.flatMap((t) => t.metre)
      if (metres.every((m) => m === metres[0])) {
        s.metre = metres[0]
      } else {
        // TODO: Think about mixed metre sets here...
      }
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
      console.log('Loading from github')

      const files = ['reels', 'jigs', 'squares', 'waltzes']

      const downloadFile = async (file: string) => {
        const url = `https://raw.githubusercontent.com/romosborne/tune-cards/master/public/tunes/${file}.yaml`
        const response = await fetch(url)
        const text = await response.text()

        const sets = load(text) as Set[]
        const hydratedSets = sets.map((s) => this.inflate(s))

        return hydratedSets
      }

      const setCollections = await Promise.all(
        files.map((f) => downloadFile(f))
      )
      return setCollections.flat()
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
