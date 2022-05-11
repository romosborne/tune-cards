import { Instrument, Metre, Set } from './types';

const storage = {
  STORAGE_KEY: "NozzySets",
  loadSets(skipCache = false): Set[] {
    console.log("Trying to load sets");

    let local = localStorage.getItem(this.STORAGE_KEY);

    if (skipCache || local === null) {
      console.log("Loading from 'api'");
      return [
        new Set(Metre.Square, [
          { title: "On the Danforth", key: "A" }
        ]),
        new Set(Metre.Square, [
          { title: "Redondo", key: "G", chordsA: ["G", "", "C", "D", "G", "", "", "Em"], chordsB: ["C", "G", "", "CD", "C", "G", "", "Em(C)"] },
          { title: "Salt River", key: "A", chordsB: ["A", "G"] },
        ]),

        new Set(Metre.Reel48, [
          { title: "Neckbelly", key: "F", chordsA: ["F", "Gm"], chordsB: ["Dm", "Bb", "F"], chordsC: ["Bb", "C", "F"] },
          { title: "Echoes", key: "F#m", chordsA: ["F#m", "E"], chordsB: ["D", "E"], chordsC: ["A"] },
        ]),
        new Set(Metre.Jig48, [
          { title: "Mattie & Karines", key: "G", chordsA: ["G", "", "C", "D"], chordsB: ["C", "D"], chordsC: ["G", "D/F#", "C", "D"] },
          { title: "Ship in Full Sail", key: "A" },
        ]),
        new Set(Metre.Reel, [
          {
            title: "Golden Stud",
            key: "Em",
            chordsB: ["C", "G", "Am", "-", "C", "G", "B", "-"],
          },
          {
            title: "Carries",
            key: "A",
            chordsB: ["D", "EA", "F#m", "E"],
          },
        ]),
        new Set(Metre.Reel, [
          {
            title: "Riff City",
            key: "Gm",
            chordsB: ["Gm", "F", "Gm"],
            notes: "Remember double/triples",
          },
          {
            title: "Folklife Reel",
            key: "Am",
            chordsA: ["Am", "C", "B", "E"],
          },
        ], { tags: ["dark", "driving"] }),

        new Set(Metre.Reel, [
          { title: "Road to Rio", key: "G" },
          { title: "Ozzy No 1", key: "Dm", chordsA: ["Dm", "Gm"] },
        ]),
        new Set(Metre.Reel, [
          { title: "Randy Miller's", key: "Am" },
          { title: "Black Pearl", key: "Bm", chordsA: ["Bm", "A"], chordsB: ["D"] },
        ]),
        new Set(Metre.Reel, [
          { title: "Reconciliation", key: "A" },
          { title: "Shirlies", key: "A" },
        ]),
        new Set(Metre.Reel, [
          { title: "Elzic's", key: "Am", chordsB: ["Am", "C", "D"] },
          { title: "Renewed Contract", key: "A", chordsB: ["F#m", "D", "A", "E"] },
        ]),
        new Set(Metre.Reel, [
          { title: "Laura's", key: "F" },
          { title: "Emma's", key: "Em", chordsB: ["Em", "C", "D", ""] },
        ]),
        new Set(Metre.Reel, [
          { title: "Castlevania", key: "Gm" },
          { title: "Waves of Rush", key: "Dm"},
        ], {fav: true}),
        new Set(Metre.Reel, [
          { title: "McKenzinator", key: "A" },
          { title: "Smelling Fresh", key: "D"},
        ]),
        new Set(Metre.Reel, [
          { title: "Cumberland Gap", key: "Am" },
          { title: "Dancing Bear", key: "Em", notes: "Children"},
        ]),
        new Set(Metre.Reel, [
          { title: "Scollay's", key: "Em", chordsA: ["Em", "", "", "D", "Em", "", "B", "Em"], chordsB: ["C", "", "Am", "D", "Em", "GC", "B", "Em"] },
          { title: "Weir at Littlebeck", key: "F#m", chordsA: ["F#m", "G#m", "A", "B/A"], chordsB: ["D", "C#m", "F#5", "E", "D", "C#m", "F#", "AB"] },
        ], {instrument: Instrument.Flute, tags: ["tiring"]}),
        new Set(Metre.Reel, [
          { title: "The Long Drop", key: "G" },
          { title: "Hamsters in the Kitchen", key: "D", chordsB: ["D", "F#m", "G"] },
        ], { title: "Long Drop" }),
        new Set(Metre.Reel, [
          { title: "The Longford Collector", key: "G" },
          { title: "That's Right Too", key: "D", chordsB: ["D", "F#m", "G"], notes: "Mind the gap!"},
        ], { title: "Longford Collector" }),
        new Set(Metre.Jig, [
          { title: "Gallagher's Frolics", key: "Em" },
          { title: "Rory Gallagher", key: "A", chordsA: ["A", "B", "D", "E"] },
        ], { title: "Turn to Stone", fav: true, instrument: Instrument.Flute, tags: ["syncopated"] }),
        new Set(Metre.Jig, [
          { title: "Basil", key: "Bm" },
          { title: "AJ's", key: "E", chordsB: ["F#m", "E/G#", "C#m", "Bm", "A", "C#m", "D", "B"] },
        ]),
        new Set(Metre.Jig, [
          { title: "Calling Wood", key: "F", chordsA: ["F", "Bb", "F", "", "F", "Dm", "C", ""], chordsB: ["Dm", "C", "Bb", "", "Gm", "F", "C", ""] },
          { title: "Mrs O'Sullivans", key: "Dm", chordsA: ["C", "F", "G", "", "Am", "G", "F"] },
        ], {tags: ["smooth", "relaxing"]}),
        new Set(Metre.Jig, [
          { title: "Rolling Waves", key: "D" },
          { title: "Gap of Dreams", key: "Bm" },
          { title: "Rolling Wave", key: "D" },
        ], { title: "The Rolling Waves", tags: ["smooth", "relaxing"] }),
        new Set(Metre.Jig, [
          { title: "Kaspar en stijn", key: "G", chordsA: ["G", "Am/G"], chordsB: ["Em", "Bm/D", "C"] },
          { title: "Serenity Hall", key: "Dm" },
        ], {tags: ["bouncy a", "bouncy b"]}),
        new Set(Metre.Jig, [
          { title: "New Fiddle", key: "E", chordsA: ["E", "D"]},
          { title: "Basil the Retriever", key: "Bm" },
        ]),
        new Set(Metre.Jig, [
          { title: "Black Sheep", key: "Em", chordsA: ["Am", "D", "Dm7", "E7", "Am", "D", "F", "G"], chordsB: ["Am", "Dm", "D7", "G7", "Am", "D7", "F", "G"]},
          { title: "The First Pint", key: "D", chordsA: ["D"], chordsB: ["Bm"]},
        ]),
      ];
    } else {
      console.log("Loading from storage");
      const sets = JSON.parse(local);
      return sets;
    }
  },

  saveAll(setList: Set[]) {
    console.log("Saving sets to storage");
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(setList));
  },
};

export default storage;
