import {thunk} from 'easy-peasy'
import produce from 'immer'

import {Chord, Progression}  from '../types/model-interfaces'
import { IProgressionStore } from './store-types';
import { WebsocketMessage } from './websocket-store';
import { findTriad } from '../midi_processing/chord-processor';

const ProgressionStore: IProgressionStore = {
  progressions: [] as Progression[],

  updateProgressions: (state, progressions: Progression[]) => {
    state.progressions = progressions
  },

  updateProgressionsFromMessage: (state, message: WebsocketMessage) => {
    state.progressions = message.data
  },

  addChordToProgression: thunk((actions, chord: Chord, {getState, dispatch}) => {
    const state = getState()
    const {progressions} = state.progressions

    const result = produce(progressions, progs => {
      if (!progs.length) {
        progs.push({chords: []})
      }

      progs.last().chords.push(chord)
    })

    actions.updateProgressions(result)
    dispatch.websocket.sendMessage({
      type: 'updateProgressions',
      data: result,
    })
  }),

  deleteChord: thunk((actions, _, {getState, dispatch}) => {
    const state = getState()
    const {progressions} = state.progressions
    const progression = progressions.last()

    if (!progression || !progression.chords.length) {
      return
    }

    const result = produce(progressions, progs => {
      progs.last().chords.pop()
    })

    actions.updateProgressions(result)
    dispatch.websocket.sendMessage({
      type: 'updateProgressions',
      data: result,
    })
  }),

  deleteProgression: thunk((actions, _, {getState, dispatch}) => {
    const state = getState()
    const {progressions} = state.progressions

    if (!progressions.length) {
      return
    }

    const progression = progressions.last()
    if (!progression.chords.length) {
      return
    }

    const result = produce(progressions, progs => {
      progs.pop()
    })

    actions.updateProgressions(result)
    dispatch.websocket.sendMessage({
      type: 'updateProgressions',
      data: result,
    })
  }),

  newProgression: thunk((actions, _, {getState, dispatch}) => {
    const state = getState()
    const {progressions} = state.progressions

    const progression = progressions.last()
    if (progression && !progression.chords.length) {
      return
    }

    const result = produce(progressions, progs => {
      progs.push({chords: []})
    })

    actions.updateProgressions(result)
    dispatch.websocket.sendMessage({
      type: 'updateProgressions',
      data: result,
    })
  }),

  saveProgression: thunk(() => {}),

  handleNotes: thunk((actions, notes) => {
    // needs to know if release
    const triad = findTriad(notes)
    if (triad) {
      actions.addChordToProgression(triad)
      // const output = state.midiDevices.activeOutput
      // if (output) {
      //   output.playChord(triad)
      // }
    }
  }),
}

export default ProgressionStore
