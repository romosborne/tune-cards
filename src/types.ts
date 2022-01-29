export enum Metre {
  Reel = "Reel",
  Reel48 = "Reel48",
  Jig = "Jig",
  Jig48 = "Jig48",
  Square = "Square",
  Waltz = "Waltz"
}

export enum Instrument {
  Flute = "Flute",
  Fiddle = "Fiddle"
}

export type Tune = {
  title: string;
  key: string;
  chordsA?: string[];
  chordsB?: string[];
  chordsC?: string[];
  notes?: string;
};

// export type Set = {
//   done?: boolean;
//   metre: Metre;
//   title?: string;
//   tunes: Tune[];
//   tags?: string[];
//   instrument?: Instrument;
// };

export type SetOptions = {
  tags?: string[];
  title?: string;
  instrument?: Instrument;
}

export class Set {
  id: string;
  done: boolean;
  metre: Metre;
  title: string;
  tunes: Tune[];
  tags?: string[];
  instrument?: Instrument;

  constructor(metre: Metre, tunes: Tune[], options?: SetOptions) {
    this.done = false;
    this.metre = metre;
    this.tunes = tunes;
    this.tags = options?.tags;
    this.title = options?.title ?? tunes.flatMap((t) => t.title).join(" + ");
    this.instrument = options?.instrument;
    this.id = this.generateId();
  }

  generateId() {
    if (this.title) {
      return this.title.replace(/\W/g, '');
    } else {
      return this.tunes.flatMap((t) => t.title).join("").replace(/\W/g, '');
    }
  }
}
