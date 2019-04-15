import { IStringStringMap } from './util/interfaces';

interface Config {
  WEBSOCKET_CONNECT_STRING: string,
}

const websocketUrlMap: IStringStringMap = {
  qa: 'https://qa-jam-app-ws.herokuapp.com',
}

export const WEBSOCKET_CONNECT_STRING = process.env.WEBSOCKET_CONNECT_STRING ||
              websocketUrlMap[process.env.NODE_ENV as string] ||
              'http://localhost:1337'

const config: Config = {
  WEBSOCKET_CONNECT_STRING,
}

export default config
