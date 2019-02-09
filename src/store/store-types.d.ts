import { Action, Thunk } from 'easy-peasy';
import { WebsocketMessage, IWebsocketStore } from './websocket-store';
import { Chord } from '../types/model-interfaces';
import { IPianoKeyProcessorStore } from './piano-key-processor-store';

export interface IStoreInit {
  init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export type HandleMessageAction = (message: WebsocketMessage) => void

export interface IHandleMessageActions {
  [key: string]: HandleMessageAction,
}

export interface IProgressionStore {
  updateProgression: Action<IProgressionStore, Chord[]>,
  updateProgressionFromMessage: Action<IProgressionStore, WebsocketMessage>,
  addChordToProgression: Thunk<IProgressionStore, Chord, void, IGlobalStore>,
  chords: Chord[],
}

export type IGlobalStore = {
  websocket: IWebsocketStore,
  pianoKeyProcessor: IPianoKeyProcessorStore,
  store: IStoreInit,
  progressions: IProgressionStore,
}
