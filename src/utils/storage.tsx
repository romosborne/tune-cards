/* eslint-disable no-console */
import { Set } from '../types'
import { load } from 'js-yaml'

const STORAGE_KEY = 'NozzySets'

function inflate(s: Set): Set {
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
}

export async function loadSets(skipCache = false): Promise<Set[]> {
  console.log('Trying to load sets')

  const local = localStorage.getItem(STORAGE_KEY)

  if (skipCache || local === null) {
    console.log('Loading from github')

    const files = ['reels', 'jigs', 'squares', 'waltzes', 'specials']

    const downloadFile = async (file: string) => {
      const url = import.meta.env.VITE_LOCAL
        ? `/tunes/${file}.yaml`
        : `https://raw.githubusercontent.com/romosborne/tune-cards/master/public/tunes/${file}.yaml`
      const response = await fetch(url)
      const text = await response.text()

      const sets = load(text) as Set[]
      const hydratedSets = sets.map((s) => inflate(s))

      return hydratedSets
    }

    const setCollections = await Promise.all(files.map((f) => downloadFile(f)))
    const sets = setCollections.flat()

    saveSets(sets)

    return sets
  } else {
    console.log('Loading from storage')
    const sets = JSON.parse(local)
    return sets
  }
}

export function saveSets(setList: Set[]) {
  console.log('Saving sets to storage')
  localStorage.setItem(STORAGE_KEY, JSON.stringify(setList))
}
