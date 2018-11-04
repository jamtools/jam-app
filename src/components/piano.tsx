import React, {useContext} from 'react'
import classnames from 'classnames'

import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from 'react-piano';

import PianoKeyProcessorContext, { PianoKeyProcessorContextValue } from '../contexts/piano-key-processor-context'

// CSS styles are required in order to render piano correctly. Importing CSS requires
// a CSS loader. Alternatively, copy the CSS file directly from src/styles.css into your <head>.
import 'react-piano/dist/styles.css';

const firstNote = MidiNumbers.fromNote('c3');
const lastNote = MidiNumbers.fromNote('g6');
window.fromNote =  MidiNumbers.fromNote
window.getAttributes =  MidiNumbers.getAttributes

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
})

import {Note, MidiNumber} from '../model-interfaces'

type PianoState = {
  heldDownNotes: MidiNumber[],
}

const notes: MidiNumber[] = []

export default function Piano(props) {
  const {state: pianoKeyProcessorState, actions: pianoKeyProcessorActions} = useContext(PianoKeyProcessorContext) as PianoKeyProcessorContextValue

    // window.setNotes = this.setNotes

  // setNotes = (heldDownNotes: MidiNumber[]) => {
  //   this.setState({heldDownNotes})
  // }

  const {heldDownNotes} = props
  const heldNumbers = heldDownNotes.map((note: Note) => note.number - 24)

  return (
    <div style={{height: '300px'}}>
      <ReactPiano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={pianoKeyProcessorActions.pressedKey}
        stopNote={(midiNumber: number) => {
        }}
        width={1000}
        keyboardShortcuts={keyboardShortcuts}
        playbackNotes={heldNumbers}
      />
      <div>
        {heldNumbers.map((midiNumber: MidiNumber) => (
          <span key={midiNumber}>
            {midiNumber}
            <pre>
            {JSON.stringify(MidiNumbers.getAttributes(midiNumber, null, 2))}
            </pre>
          </span>
        ))}
      </div>
    </div>
  )
}
