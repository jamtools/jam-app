import {thunk, Actions, Store} from 'easy-peasy'
import {MidiNumbers} from 'react-piano'
import { IGlobalStore, IMidiDeviceStore } from './store-types';
import { InputDevice, OutputDevice } from '../types/interfaces';
import connectToMidi from '../midi_devices/connectors/web-midi-connector';
import { Note } from '../types/model-interfaces';
import { Subscription } from 'rxjs';
import { findTriad } from '../midi_processing/chord-processor';

const fromNote =  MidiNumbers.fromNote
const getNoteAttributes = MidiNumbers.getAttributes

const PianoConfig = {
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}

const MidiDeviceStore: IMidiDeviceStore = {
  inputDevices: [],
  outputDevices: [],
  activeInput: undefined,
  activeOutput: undefined,

  init: thunk((actions) => {
    connectToMidi((inputs: InputDevice[], outputs: OutputDevice[]) => {
      actions.setInputMidiDevices(inputs)
      actions.setOutputMidiDevices(outputs)
    })
  }),
  setInputMidiDevices: (state, inputs: InputDevice[]) => {
    state.inputDevices = state.inputDevices.concat(inputs)
  },
  setOutputMidiDevices: (state, outputs: OutputDevice[]) => {
    state.outputDevices = state.outputDevices.concat(outputs)
  },

  selectedActiveInput: thunk((actions, input, {dispatch, getState}) => {
    const state = getState() as IGlobalStore
    if (state.midiDevices.activeInputSubscription) {
      state.midiDevices.activeInputSubscription.unsubscribe()
    }

    const subscription = input.observable.subscribe(({note, notes}) => {
      const state = getState() as IGlobalStore
      if (!notes) {
        return
      }
      const triad = findTriad(notes)
      if (triad) {
        console.log('Triad', triad)
        dispatch.progressions.addChordToProgression(triad)
        const output = state.midiDevices.activeOutput
        if (output) {
          output.playChord(triad)
        }
      }
    })

    actions.setActiveInput(input)
    actions.setActiveInputSubscription(subscription)
  }),

  setActiveInput: (state, input: InputDevice) => {
    state.activeInput = input
  },
  setActiveInputSubscription: (state, subscription: Subscription) => {
    state.activeInputSubscription = subscription
  },

  selectedActiveOutput: thunk((actions, output, {getState}) => {
    actions.setActiveOutput(output)
  }),

  setActiveOutput: (state, output: OutputDevice) => {
    state.activeOutput = output
  },
}

export default MidiDeviceStore
