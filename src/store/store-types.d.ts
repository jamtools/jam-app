import { Action, Thunk } from 'easy-peasy';
import { WebsocketMessage, IWebsocketStore } from './websocket-store';
import { Chord } from '../types/model-interfaces';
import { InputDevice, OutputDevice } from '../types/interfaces';
import { Subscription } from 'rxjs';
import ProgrammaticInput from '../midi_devices/inputs/programmatic-input';

export interface IStoreInit {
  init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export type HandleMessageAction = (message: WebsocketMessage) => void

export interface IHandleMessageActions {
  [key: string]: HandleMessageAction,
}

export interface IPianoKeyProcessorStore {
  programmaticInput?: ProgrammaticInput,
  init: Thunk<IPianoKeyProcessorStore, void, void, IGlobalStore>,
  setProgrammaticInput: Action<IPianoKeyProcessorStore, ProgrammaticInput>,
  pressedKey: Thunk<IPianoKeyProcessorStore, number, void, IGlobalStore>,
  releasedKey: Thunk<IPianoKeyProcessorStore, number, void, IGlobalStore>,
}

export interface IProgressionStore {
  updateProgression: Action<IProgressionStore, Chord[]>,
  updateProgressionFromMessage: Action<IProgressionStore, WebsocketMessage>,
  addChordToProgression: Thunk<IProgressionStore, Chord, void, IGlobalStore>,
  chords: Chord[],
}

export interface IMidiDeviceStore {
  init: Thunk<IMidiDeviceStore>,

  inputDevices: InputDevice[],
  setInputMidiDevices: Action<IMidiDeviceStore, InputDevice[]>,

  outputDevices: OutputDevice[],
  setOutputMidiDevices: Action<IMidiDeviceStore, OutputDevice[]>,

  activeInput?: InputDevice,
  activeInputSubscription?: Subscription,
  selectedActiveInput: Thunk<IMidiDeviceStore, InputDevice, void, IGlobalStore>,
  setActiveInput: Action<IMidiDeviceStore, InputDevice>,
  setActiveInputSubscription: Action<IMidiDeviceStore, Subscription>,

  activeOutput?: OutputDevice,
  selectedActiveOutput: Thunk<IMidiDeviceStore, OutputDevice>,
  setActiveOutput: Action<IMidiDeviceStore, OutputDevice>,
}

export type IGlobalStore = {
  websocket: IWebsocketStore,
  pianoKeyProcessor: IPianoKeyProcessorStore,
  store: IStoreInit,
  progressions: IProgressionStore,
  midiDevices: IMidiDeviceStore,
}
