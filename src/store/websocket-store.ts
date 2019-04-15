import io from 'socket.io-client'
import {Action, Thunk, thunk} from 'easy-peasy'
import { IGlobalStore, IHandleMessageActions } from './store-types'
import { WEBSOCKET_CONNECT_STRING } from '../config';

export type WebsocketMessage = {
  type: string,
  data: any,
  acknowledged?: boolean,
}

export interface IWebsocketStore {
  socket?: SocketIOClient.Socket,
  setSocket: Action<IWebsocketStore, SocketIOClient.Socket>,
  init: Thunk<IWebsocketStore>,
  sendMessage: Thunk<IWebsocketStore, WebsocketMessage, void, IGlobalStore>,
  handleMessage: Thunk<IWebsocketStore, WebsocketMessage, void, IGlobalStore>,
}

export const WebsocketStore: IWebsocketStore = {
  socket: undefined,

  setSocket: (state, socket: any) => {
    state.socket = socket
  },

  init: thunk(actions => {
    const socket = io(WEBSOCKET_CONNECT_STRING)
    actions.setSocket(socket)
    socket.on('message', (msg: WebsocketMessage) => actions.handleMessage(msg))
  }),

  sendMessage: thunk((actions, message: WebsocketMessage, {getState}) => {
    const socket = getState().websocket.socket as any
    if (socket) {
      socket.send(message)
    }
  }),

  handleMessage: thunk((_, message: WebsocketMessage, {dispatch}) => {
    const actions = {
      updateProgressions: dispatch.progressions.updateProgressionsFromMessage,
    } as IHandleMessageActions

    const action = actions[message.type]
    action(message)
  }),
}

export default WebsocketStore
