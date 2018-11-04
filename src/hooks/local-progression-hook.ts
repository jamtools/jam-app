import { Chord } from '../model-interfaces';

export interface ProgressionHookState {
  chords: Chord[],
}

export interface ProgressionHookActions {
  addChordToProgression: (chord: Chord) => void
}

export type ProgressionHookValue = [ProgressionHookState, ProgressionHookActions]

const defaultState = {
  chords: [] as Chord[],
}

type callbackType = (state: ProgressionHookState) => ProgressionHookState
type withCallback = (cb: callbackType) => void

function addChordToProgression(chord: Chord, state: ProgressionHookState): ProgressionHookState {
  const chords = [...state.chords]
  chords.push(chord)

  return {
    ...state,
    chords,
  }
}

type Hooks = {
  useState: any,
}

export const useProgressionHook = (initialState: ProgressionHookState, hooks: Hooks): [ProgressionHookState, ProgressionHookActions] => {
  const [state, setState] = hooks.useState(initialState || defaultState)

  const actions = {
    addChordToProgression: (chord: Chord) => (setState as withCallback)((newState: ProgressionHookState) => {
      return addChordToProgression(chord, newState)
    }),
  } as ProgressionHookActions

  return [state, actions]
}
