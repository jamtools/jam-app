import React, {useState, useContext} from 'react'

import WebsocketContext from './websocket-context'
import {useProgressionHook} from '../hooks/local-progression-hook'

const Context = React.createContext({})

type Props = {
  value?: object,
  children: React.ReactNode
}

export function PianoKeyProcessorProvider(props: Props) {
  const [state, actions] = usePianoKeyProcessorHook(props.value, {useState, useContext})

  return (
    <Context.Provider value={{state, actions}}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
