import {createStore, thunk, useActions, Actions, EasyPeasyConfig} from 'easy-peasy'

import LocalProgressionStore from './progression-store'
import PianoKeyProcessorStore from './piano-key-processor-store'
import WebsocketStore from './websocket-store'

import {initialState, saveState} from './persist-state'
import { IGlobalStore } from './store-types'
import { useEffect } from 'react';

import WebMidiConnector from '../midi_devices/connectors/web-midi-connector'
import MidiDeviceStore from './midi-device-store';

const store = createStore<IGlobalStore, EasyPeasyConfig>({
  progressions: LocalProgressionStore,
  pianoKeyProcessor: PianoKeyProcessorStore,
  websocket: WebsocketStore,
  midiDevices: MidiDeviceStore,
  // settings: {},
  store: {
    init: thunk((actions, _, {dispatch}) => {
      // dispatch.users.fetchUsers()
      dispatch.websocket.init()
      dispatch.midiDevices.init()
      dispatch.pianoKeyProcessor.init()
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
