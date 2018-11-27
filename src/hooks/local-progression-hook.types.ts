import { Chord } from "../model-interfaces";

import { WebsocketContextValue } from "../contexts/websocket-context";

export interface ProgressionHookState {
  chords: Chord[],
}

export interface ProgressionHookActions {
  addChordToProgression: (chord: Chord) => void
}

export type ProgressionHookValue = [ProgressionHookState, ProgressionHookActions]

export const defaultState = {
  chords: [] as Chord[],
}

export type callbackType = (state: ProgressionHookState) => ProgressionHookState
export type withCallback = (cb: callbackType) => void

export type Contexts = {
  websocketContext: WebsocketContextValue
}
