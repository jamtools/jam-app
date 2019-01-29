import {effect} from 'easy-peasy'
import {MidiNumbers} from 'react-piano'

const fromNote =  MidiNumbers.fromNote
const getNoteAttributes = MidiNumbers.getAttributes

const PianoConfig: any = [{
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}, {
}]

const PianoKeyProcessor = {
  pressedKey: effect(async (dispatch, midiNumber: number, getState) => {
    const [pianoConfigSelectors, pianoConfigActions] = PianoConfig
    const octaveRole = pianoConfigSelectors.getOctaveRole(midiNumber)

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

export default PianoKeyProcessor
