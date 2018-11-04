import React, {useState, useContext} from 'react'

import {usePianoKeyProcessorHook, PianoKeyProcessorHookState, PianoKeyProcessorHookActions} from '../hooks/piano-key-processor-hook'

const Context = React.createContext({})

type Props = {
  value?: object,
  children: React.ReactNode
}

export type PianoKeyProcessorContextValue = {
  state: PianoKeyProcessorHookState,
  actions: PianoKeyProcessorHookActions,
}

export function PianoKeyProcessorProvider(props: Props) {
  const [state, actions] = usePianoKeyProcessorHook(props.value, {useState, useContext})

  return (
    <Context.Provider value={{state, actions} as PianoKeyProcessorContextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
