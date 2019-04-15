import {createStore, thunk, useActions, Actions, EasyPeasyConfig} from 'easy-peasy'

import LocalProgressionStore from './progression-store'
import ProgrammaticInputProcessorStore from './programmatic-input-processor-store'
import WebsocketStore from './websocket-store'

import {initialState, saveState} from './persist-state'
import { IGlobalStore } from './store-types'
import { useEffect } from 'react';

import MidiDeviceStore from './midi-device-store';
import UserActionsStore from './user-actions-store';

const store = createStore<IGlobalStore, EasyPeasyConfig>({
  progressions: LocalProgressionStore,
  programmaticInputProcessor: ProgrammaticInputProcessorStore,
  websocket: WebsocketStore,
  midiDevices: MidiDeviceStore,
  userActions: UserActionsStore,
  // settings: {},
  store: {
    init: thunk((actions, _, {dispatch}) => {
      // dispatch.users.fetchUsers()
      dispatch.websocket.init(null)
      dispatch.midiDevices.init(null)
      dispatch.programmaticInputProcessor.init(null)
    }),
  },
}, {
  initialState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export function StoreInit(props: {children: any}) {
  const init = useActions((actions: Actions<IGlobalStore>) => actions.store.init)
  useEffect(() => {
    init(null)
  })

  return props.children
}

export default store
