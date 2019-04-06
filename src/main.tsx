import React from 'react'
import {StoreProvider} from 'easy-peasy'

import {Chord, Note} from './types/model-interfaces'
import Piano from './components/piano'
import {InputDevice, OutputDevice} from './types/interfaces'
import ProgressionView from './components/progression_view/progression_view'
import store, {StoreInit} from './store/store'
import MidiDeviceChooser from './components/midi-device-chooser/midi-device-chooser';

interface MainState {
  currentMode: string
  chords: Chord[],
  heldDownNotes: Note[],
}

export class Main extends React.PureComponent {

  state : MainState = {
    currentMode: 'recording',
    chords: [],
    heldDownNotes: [],
  }
  render() {
    const {heldDownNotes} = this.state

    return (
      <StoreProvider store={store}>
        <StoreInit>
          <MidiDeviceChooser />
          <div>
            <Piano heldDownNotes={heldDownNotes} />
            <ProgressionView />
          </div>
        </StoreInit>
      </StoreProvider>
    )
  }
}
