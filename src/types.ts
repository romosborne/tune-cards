export enum Metre {
  Reel = 'Reel',
  Reel48 = 'Reel48',
  Jig = 'Jig',
  Jig48 = 'Jig48',
  SlipJig = 'SlipJig',
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
  metre: Metre
  chordsA?: string[]
  chordsB?: string[]
  chordsC?: string[]
  notes?: string
  hint?: string
}

export type Set = {
  id: string
  metre: Metre
  title: string
  tunes: Tune[]
  tags?: string[]
  instrument?: Instrument
  fav?: boolean
}
