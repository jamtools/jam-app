export type WebsocketMessage = {
  type: string,
  data: any,
  acknowledged?: boolean,
}

export type WebsocketHookState = {
  lastMessage?: WebsocketMessage,
  socket: any,
}

export type WebsocketHookActions = {
  sendMessage: (msg: WebsocketMessage) => any,
  markLastMessageAsAcknowledged: () => WebsocketHookState,
}

export type WebsocketContextValue = {
  state: WebsocketHookState,
  actions: WebsocketHookActions,
}

function sendMessage(msg: WebsocketMessage, state: WebsocketHookState): void {
  if (state.socket) {
    state.socket.emit('message', msg)
  }
}

function markLastMessageAsAcknowledged(state: WebsocketHookState) {
  const lastMessage = {
    ...state.lastMessage,
    acknowledged: true
  }

  return {
    ...state,
    lastMessage,
  }
}

function handleMessage(msg: WebsocketMessage, setState: any) {
  setState({lastMessage: {...msg, acknowledged: false}})
}

export function useWebsocketHook(initialValue: WebsocketHookState, hooks: any): [WebsocketHookState, WebsocketHookActions] {
  const [state, setState] = hooks.useState(initialValue)

  const [intialized, setInitialized] = hooks.useState(false)
  if(!intialized) {
    state.socket.on('message', (msg: WebsocketMessage) => handleMessage(msg, setState))
    setInitialized(true)
  }

  const actions = {
    sendMessage: (message: WebsocketMessage) => (setState as any)((newState: WebsocketHookState) => {
      sendMessage(message, newState)
      return newState
    }),
    markLastMessageAsAcknowledged: () => (setState as any)((newState: WebsocketHookState) => {
      return markLastMessageAsAcknowledged(newState)
    }),
  } as WebsocketHookActions

  return [state, actions]
}
