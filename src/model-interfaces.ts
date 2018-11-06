export interface Note {
  number: number // i.e. 84
  name: string // i.e. "C"
  octave: number // i.e. 5
}

export interface Chord {
  notes: Array<Note>
}

export interface NoteCollection {
  notes: Note[]
}

export type MidiNumber = number

export const noteToMidiNumber = (note: Note) => {
  return note.number
}
