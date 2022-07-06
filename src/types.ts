export enum Metre {
  Reel = 'Reel',
  Reel48 = 'Reel48',
  Jig = 'Jig',
  Jig48 = 'Jig48',
  Square = 'Square',
  Waltz = 'Waltz',
}

export enum Instrument {
  Flute = 'Flute',
  Fiddle = 'Fiddle',
}

export type Tune = {
  title: string
  key: string
  chordsA?: string[]
  chordsB?: string[]
  chordsC?: string[]
  notes?: string
}

export type Set = {
  id: string
  done: boolean
  metre: Metre
  title: string
  tunes: Tune[]
  tags?: string[]
  instrument?: Instrument
  fav?: boolean
}
