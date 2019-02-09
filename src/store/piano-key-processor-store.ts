import {effect, thunk, Thunk} from 'easy-peasy'
import {MidiNumbers} from 'react-piano'
import { IGlobalStore } from './store-types';

const fromNote =  MidiNumbers.fromNote
const getNoteAttributes = MidiNumbers.getAttributes

const PianoConfig = {
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}

export interface IPianoKeyProcessorStore {
  pressedKey: Thunk<IPianoKeyProcessorStore, number, void, IGlobalStore>,
}

const PianoKeyProcessorStore: IPianoKeyProcessorStore = {
  pressedKey: thunk(async (actions, midiNumber: number, {dispatch}) => {
    const octaveRole = PianoConfig.getOctaveRole(midiNumber)

    const note = getNoteAttributes(midiNumber)
    const newChord = {
      notes: [
        {
          name: note.pitchName,
          octave: note.octave,
          number: note.midiNumber,
        }
      ]
    }

    dispatch.progressions.addChordToProgression(newChord)
  }),
}

export default PianoKeyProcessorStore
