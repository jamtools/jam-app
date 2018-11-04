import { Chord } from '../model-interfaces'
import WebsocketContext, { WebsocketContextValue, WebsocketMessage } from '../contexts/websocket-context'

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

type Contexts = {
  websocketContext: WebsocketContextValue
}

function addChordToProgression(chord: Chord, state: ProgressionHookState, contexts: Contexts): ProgressionHookState {
  const websocketContext = contexts.websocketContext

  const chords = [...state.chords]
  chords.push(chord)

  websocketContext.actions.sendMessage({
    type: 'updateProgression',
    data: chords,
  })

  return {
    ...state,
    chords,
  }
}

function updateProgression(chords: Chord[], state: ProgressionHookState): ProgressionHookState {
  return {
    ...state,
    chords,
  }
}

function listener()

let inititalized = false
function initWebsocketListener(websocketContext: WebsocketContextValue, state: ProgressionHookState, actions: ProgressionHookActions) {
  if (state.initialized) {
    return
  }
  state.initialized = true

  if (websocketContext.state.socket) {
    websocketContext.state.socket.on('message', (msg: WebsocketMessage) => {
      if (isProgressionMessage(msg)) {
        // websocketContext.actions.markLastMessageAsAcknowledged()
        actions[msg.type](msg.data)
      }
    })
  }
}

type Hooks = {
  useState: any,
  useContext: any,
}

const tempActions = { // just because I can't use the typescript type here at runtime in the function below
  updateProgression: null as any,
}

function isProgressionMessage(msg: WebsocketMessage) {
  return msg && msg.type in tempActions && !msg.acknowledged
}

export function useProgressionHook (initialState: ProgressionHookState, hooks: Hooks): [ProgressionHookState, ProgressionHookActions] {
  const [state, setState] = hooks.useState(initialState || defaultState)

  const websocketContext = hooks.useContext(WebsocketContext) as WebsocketContextValue

  const actions = {
    addChordToProgression: (chord: Chord) => (setState as withCallback)((newState: ProgressionHookState) => {
      return addChordToProgression(chord, newState, {websocketContext})
    }),

    updateProgression: (chords: Chord[]) => (setState as withCallback)((newState: ProgressionHookState) => {
      return updateProgression(chords, newState)
    }),

  } as ProgressionHookActions

  initWebsocketListener(websocketContext, state, actions)

  return [state, actions]
}
