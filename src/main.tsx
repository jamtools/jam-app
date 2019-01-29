import React from 'react'
import {StoreProvider} from 'easy-peasy'

import {Chord, Note} from './model-interfaces'
import Piano from './components/piano'
import {InputDevice, OutputDevice} from './midi_devices/interfaces'
import ProgressionView from './components/progression_view/progression_view'
import store, {StoreInit} from './store/store'
import MidiAndAudioContainer from './components/midi_and_audio_container'

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
      <StoreProvider store={store}>
        <StoreInit>
          <div>
            <Piano heldDownNotes={heldDownNotes} />
            <ProgressionView />
            {/* <MidiAndAudioContainer {...this.state} setState={this.setState.bind(this)} /> */}
          </div>
        </StoreInit>
      </StoreProvider>
    )
  }
}
