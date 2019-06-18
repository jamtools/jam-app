import {Note, Chord, Scale} from '../types/model-interfaces'

const SORTED_PITCHES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const ACCIDENTAL_PITCHES = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
const PITCH_INDEXES = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11,
}

const MAJOR_ROOT_INDEXES = {
  '0': 'Major',
  '2': 'Minor',
  '4': 'Minor',
  '5': 'Major',
  '7': 'Major',
  '9': 'Minor',
}

const MINOR_ROOT_INDEXES = {
  '0': 'Minor',
  '3': 'Major',
  '5': 'Minor',
  '7': 'Minor',
  '8': 'Major',
  '10': 'Major',
}

export const cycle = (x: number) => x % 12

export function findTriad(notes: Note[]): Chord | void {
  const sorted = notes.sort((n1, n2) => n1.number - n2.number)

  const root = sorted[0]

  const third = sorted.find(n => cycle(n.number) === cycle(root.number + 3) || cycle(n.number) === cycle(root.number + 4))
  if (!third) {
    return
  }
  const fifth = sorted.find(n => cycle(n.number) === cycle(root.number + 7))
  if (!fifth) {
    return
  }

  return {notes: [root, third, fifth]}
}

export function getRootModeChord(scale: Scale, note: Note, octaveOffset: number) : Chord | null {
  if (note.octave > 3) {
    return null
  }

  if (!isNoteInScale(scale, note)) {
    return {notes: []}
  }

  const rootMod = note.number % 12
  const inv = getInversion(scale, note, octaveOffset + 1)

  const totalOffset = octaveOffset * 12

  const root = noteFromNumber(rootMod + totalOffset)
  const rootOctave = noteFromNumber(rootMod + totalOffset + 12)
  const notes = [
    root,
    rootOctave,
    ...inv.notes,
  ]

  const unique = {}
  notes.forEach(note => {
    unique[note.number] = note
  })

  return {
    notes: Object.values(unique),
  }
}

export function getInversion(scale: Scale, note: Note, octaveOffset: number) : Chord | null {
  const rootMod = cycle(note.number)

  const thirdOffset = getThird(scale, note)

  if (rootMod === 3 || rootMod === 4) {
    const fifthMod = cycle(rootMod + 7)
    const fifth = fifthMod + ((octaveOffset - 1) * 12)
    const upperRoot = fifth + 5
    const third = upperRoot + thirdOffset
    const upperOctave = fifth + 12

    return {
      notes: [
        noteFromNumber(fifth),
        noteFromNumber(upperRoot),
        noteFromNumber(third),
        noteFromNumber(upperOctave),
      ],
    }
  }
  else if (rootMod >= 5 && rootMod <= 8) {
    const fifthMod = cycle(rootMod + 7)
    const fifth = fifthMod + (octaveOffset * 12)
    const upperRoot = fifth + 5
    const third = upperRoot + thirdOffset
    const upperOctave = fifth + 12

    return {
      notes: [
        noteFromNumber(fifth),
        noteFromNumber(upperRoot),
        noteFromNumber(third),
        noteFromNumber(upperOctave),
      ],
    }
  }

  else if (rootMod >= 9 && rootMod <= 11) {
    const upperRoot = rootMod + ((octaveOffset - 1) * 12)
    const third = upperRoot + thirdOffset
    const fifth = upperRoot + 7
    const upperOctave = upperRoot + 12

    return {
      notes: [
        noteFromNumber(upperRoot),
        noteFromNumber(third),
        noteFromNumber(fifth),
        noteFromNumber(upperOctave),
      ],
    }
  }
  else {
    const upperRoot = rootMod + (octaveOffset * 12)
    const third = upperRoot + thirdOffset
    const fifth = upperRoot + 7
    const upperOctave = upperRoot + 12

    return {
      notes: [
        noteFromNumber(upperRoot),
        noteFromNumber(third),
        noteFromNumber(fifth),
        noteFromNumber(upperOctave),
      ],
    }
  }
}

export function noteFromNumber(noteNumber: number) : Note {
  const noteName = SORTED_PITCHES[cycle(noteNumber)]
  const octave = Math.floor((noteNumber - 24) / 12)

  return {
    number: noteNumber,
    name: noteName,
    octave,
  }
}

export function isNoteInScale(scale: Scale, note: Note) {
  const diff = getNoteDiff(note.number, scale.root)

  const scaleDegrees = scale.quality === 'Major' ? MAJOR_ROOT_INDEXES : MINOR_ROOT_INDEXES
  return Boolean(diff.toString() in scaleDegrees)
}

export function getThird(scale: Scale, note: Note) {
  const diff = getNoteDiff(note.number, scale.root)

  const scaleDegrees = scale.quality === 'Major' ? MAJOR_ROOT_INDEXES : MINOR_ROOT_INDEXES
  const degreeQuality = scaleDegrees[diff.toString()]

  return degreeQuality === 'Major' ? 4 : 3
}

export function getNoteDiff(num1: number, num2: number) {
  const diff = (num1 + 12) - num2
  return diff % 12
}
