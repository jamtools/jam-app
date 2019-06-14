import { thunk } from 'easy-peasy'
import { MidiNumbers } from 'react-piano'
import { IProgrammaticInputProcessorStore } from './store-types';
import ProgrammaticInput from '../midi_devices/inputs/programmatic-input';

const getNoteAttributes = MidiNumbers.getAttributes

const PianoConfig = {
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}

const ProgrammaticInputProcessor: IProgrammaticInputProcessorStore = {
  programmaticInput: undefined,

  init: thunk((actions, _, {dispatch}) => {
    const programmaticInput = new ProgrammaticInput()
    dispatch.midiDevices.setInputMidiDevices([programmaticInput])
    dispatch.midiDevices.selectedActiveInput(programmaticInput)
    actions.setProgrammaticInput(programmaticInput)
  }),

  setProgrammaticInput: (state, input: ProgrammaticInput) => {
    state.programmaticInput = input
  },

  pressedKey: thunk((actions, midiNumber: number, {getState}) => {
    const octaveRole = PianoConfig.getOctaveRole(midiNumber)
    const input = getState().programmaticInputProcessor.programmaticInput

    const noteAttributes = getNoteAttributes(midiNumber)
    const note = {
      name: noteAttributes.pitchName,
      octave: noteAttributes.octave,
      number: noteAttributes.midiNumber,
    }

    if (input) {
      input.noteOn(note)
    }
  }),

  releasedKey: thunk((actions, midiNumber: number, {getState}) => {
    const input = getState().programmaticInputProcessor.programmaticInput

    const noteAttributes = getNoteAttributes(midiNumber)
    const note = {
      name: noteAttributes.pitchName,
      octave: noteAttributes.octave,
      number: noteAttributes.midiNumber,
    }

    if (input) {
      input.noteOff(note)
    }
  }),
}

export default ProgrammaticInputProcessor
