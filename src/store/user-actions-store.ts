import {thunk, State, Actions} from 'easy-peasy'

import { IUserActionsStore, IGlobalStore, UserControls } from './store-types';
import { InputMessage } from '../types/interfaces';
import { INumberNumberMap } from '../util/interfaces';
import { Note } from '../types/model-interfaces';

const UserActionsStore: IUserActionsStore = {
  assignedControls: {},
  selectedControl: undefined,

  clickedControl: (state, control) => {
    if (state.selectedControl === control) {
      state.selectedControl = undefined
    }
    else {
      state.selectedControl = control
    }
  },

  assignControl: (state, {control, key}) => {
    const assignedControls = state.assignedControls as INumberNumberMap
    assignedControls[key] = control
  },

  pressedKey: thunk((actions, inputMessage: InputMessage, store) => {
    const state = store.getState()
    const dispatch = store.dispatch

    const {selectedControl, assignedControls} = state.userActions
    const key = inputMessage.note.number

    if (selectedControl !== undefined) {
      actions.clickedControl(selectedControl)

      actions.assignControl({control: selectedControl, key: key})
      return
    }

    if (assignedControls[key]) {
      const actions = {
        [UserControls.NextLine]: dispatch.progressions.newProgression,
        [UserControls.DeleteProgression]: dispatch.progressions.deleteProgression,
        [UserControls.DeleteChord]: dispatch.progressions.deleteChord,
        [UserControls.SaveProgression]: () => {},
      }
      actions[assignedControls[key]]()
      return
    }

    const notes = inputMessage.notes
    if (!notes || !notes.length) {
      return
    }

    dispatch.progressions.handleNotes(notes)
  }),
  releasedKey: thunk((actions, inputMessage: InputMessage) => {

  }),
}

export default UserActionsStore
