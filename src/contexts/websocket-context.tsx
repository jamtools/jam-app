import React from 'react'
import io from 'socket.io-client'

const WEBSOCKET_CONNECT_STRING = 'http://localhost:1337'

export type WebsocketMessage = {
  type: string,
  data: any,
  acknowledged?: boolean,
}

type WebsocketContextState = {
  lastMessage?: WebsocketMessage,
  socket: any,
}

type WebsocketContextActions = {
  sendMessage: (msg: WebsocketMessage) => void,
  markLastMessageAsAcknowledged: () => void,
}

export type WebsocketContextValue = {
  state: WebsocketContextState,
  actions: WebsocketContextActions,
}

const Context = React.createContext({})
const socket = io(WEBSOCKET_CONNECT_STRING)

export class WebsocketProvider extends React.PureComponent<any, WebsocketState> {

  state = {
    lastMessage: null,
    socket,
  }

  componentDidMount() {
    socket.on('message', this.handleMessage)
  }

  sendMessage = (msg: WebsocketMessage) => {
    if (this.state.socket) {
      this.state.socket.emit('message', msg)
    }
  }

  markLastMessageAsAcknowledged = () => {
    if (this.state.lastMessage) {
      this.state.lastMessage.acknowledged = true
      this.setState({lastMessage: {...this.state.lastMessage, acknowledged: true}})
    }
  }

  actions = {
    sendMessage: this.sendMessage,
    markLastMessageAsAcknowledged: this.markLastMessageAsAcknowledged,
  } as WebsocketContextActions

  handleMessage = (msg: WebsocketMessage) => {
    this.setState({lastMessage: {...msg, acknowledged: false}})
  }

  render() {
    return (
      <Context.Provider value={{state: this.state, actions: this.actions}}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
