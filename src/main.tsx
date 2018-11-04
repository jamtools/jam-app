import React from 'react'

import {Chord, Note} from './model-interfaces'
import MidiAndAudioContainer from './components/midi_and_audio_container'
import Piano from './components/piano'
import {InputDevice, OutputDevice} from './midi_devices/interfaces'
import ProgressionView from './components/progression_view/progression_view'
import ProgressionContext, {ProgressionProvider} from './contexts/progression-context'
import WebsockerContext, {WebsocketProvider} from './contexts/websocket-context'
import {PianoKeyProcessorProvider} from './contexts/piano-key-processor-context'

interface MainState {
  inputs: Array<InputDevice>
  activeInput: InputDevice
  outputs: Array<OutputDevice>
  activeOutput: OutputDevice
  currentMode: string
  chords: Array<Chord>
  heldDownNotes: Array<Note>
}

export class Main extends React.PureComponent {

  state : MainState = {
    inputs: [],
    activeInput: null,
    outputs: [],
    activeOutput: null,
    currentMode: 'recording',
    chords: [],
    heldDownNotes: [],
  }
  render() {
    const {heldDownNotes} = this.state

    return (
      <WebsocketProvider>
        <ProgressionProvider value={{chords: [{notes: [{
          "name": "C",
          "number": 84,
          "octave": 5,
        }]}]}}>
          <PianoKeyProcessorProvider>
            <div>
              <Piano heldDownNotes={heldDownNotes} />
              <ProgressionView />
              {/* <MidiAndAudioContainer {...this.state} setState={this.setState.bind(this)} /> */}
            </div>
          </PianoKeyProcessorProvider>
        </ProgressionProvider>
      </WebsocketProvider>
    )
  }
}
