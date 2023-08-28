import React from 'react'
import {StoreProvider} from 'easy-peasy'

import './polyfills'
import './styles/global.scss'

import {Chord, Note} from './types/model-interfaces'
import Piano from './components/piano/piano'
import {InputDevice, OutputDevice} from './types/interfaces'
import ProgressionView from './components/progression_view/progression_view'
import store, {StoreInit} from './store/store'
import MidiDeviceChooser from './components/midi-device-chooser/midi-device-chooser';
import UserControlsComponent from './components/user-controls/user-controls';

interface MainState {
  currentMode: string
  chords: Chord[],
  heldDownNotes: Note[],
  show: boolean,
}

export function Main() {
  return (
    <StoreProvider store={store}>
      <StoreInit>
        <InnerMain />
      </StoreInit>
    </StoreProvider>
  )
}

export class InnerMain extends React.PureComponent {

  state : MainState = {
    currentMode: 'recording',
    chords: [],
    heldDownNotes: [],
    show: true,
  }
  render() {
    const {heldDownNotes, show} = this.state

    const buttonText = show ? 'Hide' : 'Show'
    const display = show ? '' : 'none'
    const showOrHide = () => this.setState({show: !show})

    return (
      <div>
        <button onClick={showOrHide}>{buttonText}</button>
        <div style={{display}}>
          <UserControlsComponent />
          <MidiDeviceChooser />
          <div>
            <Piano heldDownNotes={heldDownNotes} />
          </div>
        </div>
        <ProgressionView />
      </div>
    )
  }
}
