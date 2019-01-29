import axios from 'axios'
import {useEffect} from 'react'
import useReactRouter from 'use-react-router';
import {createStore, useAction, useStore, effect} from 'easy-peasy'

import LocalProgressionStore from './local-progression-store'
import PianoKeyProcessorStore from './piano-key-processor-store'

import {initialState, saveState} from './persist-state'

const store = createStore({
  progressions: LocalProgressionStore,
  pianoKeyProcessor: PianoKeyProcessorStore,
  settings: {},
  store: {
    init: effect((dispatch) => {
      // dispatch.users.fetchUsers()
    }),
  },
}, {
  initialState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export function StoreInit(props: {children: any}) {
  // const {history, location} = useReactRouter()
  const init = useAction(dispatch => dispatch.store.init)
  // const token = useStore(state => state.auth.authToken)

  // may want to make this more secure. another library could be using axios
  // axios.defaults.headers.common['Authorization'] = token

  // useEffect(() => {
  //   if (location.pathname !== '/login') {
  //     init()
  //   }

  //   axios.interceptors.response.use(response => {
  //     return response;
  //   }, error => {
  //     if (error.response.status === 401) {
  //       history.push('/login')
  //     }
  //     return error;
  //   })
  // }, [])

  return props.children
}

export default store
