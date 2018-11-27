import React, {useState} from 'react'
import io from 'socket.io-client'
import {useWebsocketHook} from '../hooks/websocket-hook'

const WEBSOCKET_CONNECT_STRING = 'http://localhost:1337'

const Context = React.createContext({})
const socket = io(WEBSOCKET_CONNECT_STRING)

export function WebsocketProvider(props) {

  const [state, actions] = useWebsocketHook({
    lastMessage: null,
    socket,
  })

  return (
    <Context.Provider value={{state, actions}}>
      {props.children}
    </Context.Provider>
  )
}

export default Context
