import {effect, thunk, Thunk} from 'easy-peasy'
import {MidiNumbers} from 'react-piano'
import { IGlobalStore, IPianoKeyProcessorStore } from './store-types';
import ProgrammaticInput from '../midi_devices/inputs/programmatic-input';

const fromNote =  MidiNumbers.fromNote
const getNoteAttributes = MidiNumbers.getAttributes

const PianoConfig = {
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}

const PianoKeyProcessorStore: IPianoKeyProcessorStore = {
  programmaticInput: undefined,

  init: thunk((actions, _, {dispatch}) => {
    const programmaticInput = new ProgrammaticInput()
    dispatch.midiDevices.setInputMidiDevices([programmaticInput])
    actions.setProgrammaticInput(programmaticInput)
  }),

  setProgrammaticInput: (state, input: ProgrammaticInput) => {
    state.programmaticInput = input
  },

  pressedKey: thunk((actions, midiNumber: number, {dispatch, getState}) => {
    const octaveRole = PianoConfig.getOctaveRole(midiNumber)
    const input = getState().pianoKeyProcessor.programmaticInput

    const noteAttributes = getNoteAttributes(midiNumber)
    const note = {
      name: noteAttributes.pitchName,
      octave: noteAttributes.octave,
      number: noteAttributes.midiNumber,
    }

    if (input) {
      input.noteOn(note)
    }

    const newChord = {
      notes: [
        note,
      ],
    }

    // dispatch.progressions.addChordToProgression(newChord)
  }),

  releasedKey: thunk((actions, midiNumber: number, {dispatch, getState}) => {
    const input = getState().pianoKeyProcessor.programmaticInput

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

export default PianoKeyProcessorStore
