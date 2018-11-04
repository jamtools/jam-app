import React from 'react'
import io from 'socket.io-client'

const WEBSOCKET_CONNECT_STRING = 'http://localhost:1337'

type WebsocketMessage = {

}

type WebsocketState = any

const Context = React.createContext({})
// const socket = io(WEBSOCKET_CONNECT_STRING)

export class WebsocketProvider extends React.PureComponent<any, WebsocketState> {

  state = {
    // socket,
    value: {},
  }

  componentDidMount() {
    // socket.on('message', this.handleMessage)
    // window.socket = socket
  }

  handleMessage = (msg: WebsocketMessage) => {
    console.log('yes')
    console.log(msg)
    this.setState({value: msg})
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
