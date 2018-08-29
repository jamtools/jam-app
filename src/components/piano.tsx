import React from 'react'

import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from 'react-piano';

// CSS styles are required in order to render piano correctly. Importing CSS requires
// a CSS loader. Alternatively, copy the CSS file directly from src/styles.css into your <head>.
import 'react-piano/build/styles.css';

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
  notesHeld: MidiNumber[],
}

const notes: MidiNumber[] = []

class Piano extends React.PureComponent<any, PianoState> {
  state: PianoState = {
    notesHeld: [],
  }

  constructor(props: any) {
    super(props)
    window.setNotes = this.setNotes
  }

  setNotes = (notesHeld: MidiNumber[]) => {
    this.setState({notesHeld})
  }

  render() {
    const {notesHeld} = this.state

    return (
      <div>
        <ReactPiano
          noteRange={{ first: firstNote, last: lastNote }}
          onPlayNote={(midiNumber: number) => {
          }}
          onStopNote={(midiNumber: number) => {
          }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
          playbackNotes={notesHeld}
        />
        <div>
          {notesHeld.map((midiNumber: MidiNumber) => (
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
}

export default Piano