import React from 'react'
import {useAction} from 'easy-peasy'

import { MidiNumbers } from 'react-piano';

import {Note, MidiNumber} from '../model-interfaces'
import DumbPiano from './dumb-piano'

type PianoState = {
  heldDownNotes: MidiNumber[],
}

const notes: MidiNumber[] = []

export default function Piano(props) {
    // window.setNotes = this.setNotes

  // setNotes = (heldDownNotes: MidiNumber[]) => {
  //   this.setState({heldDownNotes})
  // }

  const pressedKey = useAction(dispatch => dispatch.pianoKeyProcessor.pressedKey)

  const {heldDownNotes} = props
  const heldNumbers = heldDownNotes.map((note: Note) => note.number - 24)

  return (
    <div>
      <DumbPiano
        // noteRange={{ first: firstNote, last: lastNote }}
        octaves={3}
        showComputerKeyNames={true}
        playNote={pressedKey}
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
