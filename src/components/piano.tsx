import React from 'react'
import {useAction, useActions, Actions} from 'easy-peasy'

import { MidiNumbers } from 'react-piano';

import {Note, MidiNumber} from '../types/model-interfaces'
import DumbPiano from './dumb-piano'
import { IGlobalStore } from '../store/store-types';

type PianoState = {
  heldDownNotes: MidiNumber[],
}

const notes: MidiNumber[] = []

type Props = {
  heldDownNotes: Note[],
}

export default function Piano(props: Props) {
    // window.setNotes = this.setNotes

  // setNotes = (heldDownNotes: MidiNumber[]) => {
  //   this.setState({heldDownNotes})
  // }

  const pressedKey = useActions((actions: Actions<IGlobalStore>) => actions.pianoKeyProcessor.pressedKey)
  const releasedKey = useActions((actions: Actions<IGlobalStore>) => actions.pianoKeyProcessor.releasedKey)

  const {heldDownNotes} = props
  const heldNumbers = heldDownNotes.map((note: Note) => note.number - 24)

  return (
    <div>
      <DumbPiano
        // noteRange={{ first: firstNote, last: lastNote }}
        octaves={3}
        showComputerKeyNames={true}
        playNote={pressedKey}
        stopNote={releasedKey}
        width={1000}
        // keyboardShortcuts={keyboardShortcuts}
        heldDownNotes={heldDownNotes}
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
