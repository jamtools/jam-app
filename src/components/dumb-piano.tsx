import React from 'react'

import { KeyboardShortcuts, MidiNumbers, Piano as ReactPiano } from 'react-piano'

import 'react-piano/dist/styles.css';

const getOctaveBounds = (octaves: number) => {
  const firstNote = MidiNumbers.fromNote('c3')
  const lastNote = MidiNumbers.fromNote(`c${octaves + 3}`)
  return {
    firstNote,
    lastNote,
    keyboardShortcuts: KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    }),
  }
}

const getMeaningfulNote = (note: Note) => {
  return (note.number % 12) + 48
}

import {Note, MidiNumber} from '../types/model-interfaces'

type PianoState = {
  heldDownNotes: MidiNumber[],
}

const notes: MidiNumber[] = []

type Props = {
  heldDownNotes: Note[],
  octaves?: number,
  showComputerKeyNames?: boolean,
  height?: string | number,
  width?: string | number,
  playNote?: (note: MidiNumber) => void,
  stopNote?: (note: MidiNumber) => void,
}

export default function DumbPiano(props: Props) {
  const {heldDownNotes} = props
  const heldNumbers = heldDownNotes.map((note: Note) => note.number - 24)

  const octaves = props.octaves || 1
  const {firstNote, lastNote, keyboardShortcuts} = getOctaveBounds(octaves)

  const showComputerKeyNames = props.showComputerKeyNames || undefined

  const ls = []
  if (heldDownNotes && heldDownNotes.length) {
    ls.push(getMeaningfulNote(heldDownNotes[0]))
  }
  console.log(ls)

  return (
    <div style={{height: props.height || '300px'}}>
      <ReactPiano
        height={'300px'}
        width={props.width || 1000}
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={props.playNote || console.log}
        stopNote={props.stopNote || console.log}
        keyboardShortcuts={showComputerKeyNames && keyboardShortcuts}
        activeNotes={ls}
      />
    </div>
  )
}
