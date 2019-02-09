import {createStore, thunk, useActions, Actions} from 'easy-peasy'

import LocalProgressionStore from './progression-store'
import PianoKeyProcessorStore from './piano-key-processor-store'
import WebsocketStore from './websocket-store'

import {initialState, saveState} from './persist-state'
import { IGlobalStore } from './store-types'
import { useEffect } from 'react';

const store = createStore<IGlobalStore>({
  progressions: LocalProgressionStore,
  pianoKeyProcessor: PianoKeyProcessorStore,
  websocket: WebsocketStore,
  // settings: {},
  store: {
    init: thunk((actions, _, {dispatch}) => {
      // dispatch.users.fetchUsers()
      dispatch.websocket.init()
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
    init()
  })

  return props.children
}

export default store
