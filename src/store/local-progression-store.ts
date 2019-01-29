import {effect} from 'easy-peasy'

import { Chord } from '../model-interfaces'
import WebsocketContext from '../contexts/websocket-context'
import { ProgressionHookState, ProgressionHookActions, Contexts, defaultState, withCallback } from './local-progression-store.types';

// function initWebsocketListener(websocketContext: WebsocketContextValue, state: ProgressionHookState, actions: ProgressionHookActions) {
//   if (state.initialized) {
//     return
//   }
//   state.initialized = true

//   if (websocketContext.state.socket) {
//     websocketContext.state.socket.on('message', (msg: WebsocketMessage) => {
//       console.log(msg)
//       if (isProgressionMessage(msg)) {
//         // websocketContext.actions.markLastMessageAsAcknowledged()
//         actions[msg.type](msg.data)
//       }
//     })
//   }
// }

const tempActions = { // just because I can't use the typescript type here at runtime in the function below
  updateProgression: null as any,
}

function isProgressionMessage(msg: WebsocketMessage) {
  return msg && msg.type in tempActions && !msg.acknowledged
}

export function useProgressionHook (initialState: ProgressionHookState, hooks: Hooks): [ProgressionHookState, ProgressionHookActions] {
  const [state, setState] = hooks.useState(initialState || defaultState)

  // const websocketContext = hooks.useContext(WebsocketContext) as WebsocketContextValue

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

const LocalProgressionStore = {
  updateProgression: (state, chords: Chord[]) => {
    state.chords = chords
  },
  addChordToProgression: effect(async (dispatch, chord: Chord, getState) => {
    const oldChords = getState().progressions.chords
    // const websocketContext = contexts.websocketContext
    const chords = oldChords.concat([chord])
    dispatch.progressions.updateProgression(chords)
    dispatch.websockets.sendMessage({
      type: 'updateProgression',
      data: chords,
    })
  }),
  chords: [
    {
      notes: [
        {
          number: 84,
          name: 'C',
          octave: 5,
        },
      ],
    },
  ] as Chord[],
} as any

export default LocalProgressionStore
