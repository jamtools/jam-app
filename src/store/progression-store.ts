import {effect, thunk} from 'easy-peasy'

import {Chord}  from '../types/model-interfaces'
import { IProgressionStore } from './store-types';
import { WebsocketMessage } from './websocket-store';

const ProgressionStore: IProgressionStore = {
  updateProgression: (state, chords: Chord[]) => {
    state.chords = chords
  },
  updateProgressionFromMessage: (state, message: WebsocketMessage) => {
    state.chords = message.data
  },
  addChordToProgression: thunk(async (actions, chord: Chord, {getState, dispatch}) => {
    const oldChords = getState().progressions.chords
    const chords = oldChords.concat([chord])
    actions.updateProgression(chords)
    dispatch.websocket.sendMessage({
      type: 'updateProgression',
      data: chords,
    })
  }),
  chords: [
    // {
    //   notes: [
    //     {
    //       number: 84,
    //       name: 'C',
    //       octave: 5,
    //     },
    //   ],
    // },
  ] as Chord[],
}

export default ProgressionStore
