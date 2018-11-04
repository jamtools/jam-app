import {MidiNumbers} from 'react-piano';

const fromNote =  MidiNumbers.fromNote
const getNoteAttributes = MidiNumbers.getAttributes

import ProgressionContext, { ProgressionContextValue } from '../contexts/progression-context'

const PianoConfig: any = [{
  getOctaveRole: (octave: number) => 'ROOT_CHOICE',
}, {
}]

export interface PianoKeyProcessorHookState {

}

export interface PianoKeyProcessorHookActions {
  pressedKey: (midiNumber: number) => void
}

export type PianoKeyProcessorHookValue = [PianoKeyProcessorHookState, PianoKeyProcessorHookActions]

const defaultState = {
  // chords: [] as Chord[],
}

type callbackType = (state: PianoKeyProcessorHookState) => PianoKeyProcessorHookState
type withCallback = (cb: callbackType) => void

export function pressedKey(midiNumber: number, state: PianoKeyProcessorHookState, contexts: any): void {
  const [pianoConfigSelectors, pianoConfigActions] = contexts.pianoConfig
  const octaveRole = pianoConfigSelectors.getOctaveRole(midiNumber)

  const {state: progressionState, actions: progressionActions} = contexts.progressionContext as ProgressionContextValue
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
  console.log(note)

  progressionActions.addChordToProgression(newChord)
}

type Hooks = {
  useState: any,
  useContext: any,
}

export const usePianoKeyProcessorHook = (initialState: PianoKeyProcessorHookState, hooks: Hooks): [PianoKeyProcessorHookState, PianoKeyProcessorHookActions] => {
  const [state, setState] = hooks.useState(initialState || defaultState)

  // const [pianoConfigSelectors, pianoConfig] = useContext(PianoConfig)
  const pianoConfig = PianoConfig
  const progressionContext = hooks.useContext(ProgressionContext)

  const actions = {
    pressedKey: (midiNumber: number) => pressedKey(midiNumber, state, {pianoConfig, progressionContext}),
  } as PianoKeyProcessorHookActions

  return [state, actions]
}
