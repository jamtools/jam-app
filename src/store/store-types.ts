import { Action, Thunk } from 'easy-peasy'
import { WebsocketMessage, IWebsocketStore } from './websocket-store'
import { Chord, Progression, Note } from '../types/model-interfaces'
import { InputDevice, OutputDevice, InputMessage } from '../types/interfaces'
import { Subscription } from 'rxjs'
import ProgrammaticInput from '../midi_devices/inputs/programmatic-input'

import {INumberNumberMap} from '../util/interfaces'

export interface IStoreInit {
  init: Thunk<IStoreInit, void, void, IGlobalStore>,
}

export type HandleMessageAction = (message: WebsocketMessage) => void

export interface IHandleMessageActions {
  [key: string]: HandleMessageAction,
}

export interface IProgrammaticInputProcessorStore {
  programmaticInput?: ProgrammaticInput,
  init: Thunk<IProgrammaticInputProcessorStore, void, void, IGlobalStore>,
  setProgrammaticInput: Action<IProgrammaticInputProcessorStore, ProgrammaticInput>,
  pressedKey: Thunk<IProgrammaticInputProcessorStore, number, void, IGlobalStore>,
  releasedKey: Thunk<IProgrammaticInputProcessorStore, number, void, IGlobalStore>,
}

export interface IProgressionStore {
  updateProgressions: Action<IProgressionStore, Progression[]>,
  updateProgressionsFromMessage: Action<IProgressionStore, WebsocketMessage>,
  addChordToProgression: Thunk<IProgressionStore, Chord, void, IGlobalStore>,
  newProgression: Thunk<IProgressionStore, void, void, IGlobalStore>,
  deleteChord: Thunk<IProgressionStore, void, void, IGlobalStore>,
  deleteProgression: Thunk<IProgressionStore, void, void, IGlobalStore>,
  saveProgression: Thunk<IProgressionStore, void, void, IGlobalStore>,
  handleNotes: Thunk<IProgressionStore, Note[], void, IGlobalStore>,
  progressions: Progression[],
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

export enum UserControls {
  NextLine = 1,
  DeleteChord = 2,
  DeleteProgression = 3,
  SaveProgression = 4,
}

export interface IUserActionsStore {
  assignedControls: INumberNumberMap,
  selectedControl?: UserControls,

  assignControl: Action<IUserActionsStore, {control: UserControls, key: number}>,
  clickedAssign: Action<IUserActionsStore, UserControls>,
  clickedDo: Thunk<IUserActionsStore, UserControls, void, IGlobalStore>,
  performAction: Thunk<IUserActionsStore, UserControls, void, IGlobalStore>,
  pressedKey: Thunk<IUserActionsStore, InputMessage, void, IGlobalStore>,
  releasedKey: Thunk<IUserActionsStore, InputMessage, void, IGlobalStore>,
}

export type IGlobalStore = {
  websocket: IWebsocketStore,
  programmaticInputProcessor: IProgrammaticInputProcessorStore,
  store: IStoreInit,
  progressions: IProgressionStore,
  midiDevices: IMidiDeviceStore,
  userActions: IUserActionsStore,
}
