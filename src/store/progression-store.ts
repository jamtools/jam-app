import {thunk} from 'easy-peasy'
import produce from 'immer'

import {Chord, Progression, Scale}  from '../types/model-interfaces'
import { IProgressionStore } from './store-types'
import { WebsocketMessage } from './websocket-store'
import { findTriad, getRootModeChord, isNoteInScale } from '../midi_processing/chord-processor'

const ProgressionStore: IProgressionStore = {
  progressions: [] as Progression[],

  selectingScale: false,
  willSelectScale: (state) => {
    state.selectingScale = true
  },

  currentScale: undefined,
  didSelectScale: (state, scale) => {
    state.currentScale = scale
    state.selectingScale = false
  },

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

  handleNotes: thunk((actions, inputMessage, {getState}) => {
    if (!inputMessage.pressed) {
      return
    }

    const state = getState()
    const output = state.midiDevices.activeOutput

    const selectingScale = state.progressions.selectingScale

    if (selectingScale) {
      const triad = findTriad(inputMessage.notes)
      if (!triad) {
        return
      }

      const rootMod = triad.notes[0].number % 12
      const thirdMod = triad.notes[1].number % 12

      const diff = (thirdMod + 12) - rootMod
      const diffMod = diff % 12

      let scale
      if (diffMod == 3) {
        scale = {
          root: rootMod,
          quality: 'Minor',
        }
      }
      else {
        scale = {
          root: rootMod,
          quality: 'Major',
        }
      }
      actions.didSelectScale(scale)
      return
      // actions.addChordToProgression(triad)
    }

    if (output) {
      const note = inputMessage.note
      const chord = getRootModeChord(state.progressions.currentScale, note, 4)
      if (chord) {
        output.playChord(chord)
      }
      else {
        output.playNote(note)
      }
    }
  }),
}

export default ProgressionStore
