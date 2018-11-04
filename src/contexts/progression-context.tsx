import React, {useState, useContext} from 'react'

import WebsocketContext from './websocket-context'
import {useProgressionHook, ProgressionHookState, ProgressionHookActions, ProgressionHookValue} from '../hooks/local-progression-hook'

type Props = {
  value?: ProgressionHookState,
  children: React.ReactNode
}

export type ProgressionContextValue = {
  state: ProgressionHookState,
  actions: ProgressionHookActions,
}

const Context = React.createContext({})

export function ProgressionProvider(props: Props) {
  const [progressionState, actions] = useProgressionHook(props.value, {useState, useContext})

  // const {state: websocketState} = useContext(WebsocketContext)

  const state = {
    // ...websocketState,
    ...progressionState,
  }

  console.log(state)

  return (
    <Context.Provider value={{state, actions} as ProgressionContextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
