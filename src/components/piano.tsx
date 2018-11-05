import React, {useContext} from 'react'
import classnames from 'classnames'

import { MidiNumbers } from 'react-piano';
import DumpPiano from './dumb-piano'

import PianoKeyProcessorContext, { PianoKeyProcessorContextValue } from '../contexts/piano-key-processor-context'

import {Note, MidiNumber} from '../model-interfaces'
import DumbPiano from './dumb-piano';

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
    <div>
      <DumbPiano
        // noteRange={{ first: firstNote, last: lastNote }}
        octaves={3}
        showComputerKeyNames={true}
        playNote={pianoKeyProcessorActions.pressedKey}
        stopNote={(midiNumber: number) => {
        }}
        width={1000}
        // keyboardShortcuts={keyboardShortcuts}
        heldDownNotes={heldNumbers}
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
