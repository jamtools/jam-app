import {Observable} from 'rxjs'
import {Chord, Note} from './model-interfaces'

export interface InputMessage {
  note?: Note,
  notes: Note[],
}

export interface InputDevice {
  getCurrentlyHeldDownNotes(): Array<Note>
  getName(): string
  observable: Observable<InputMessage>
}

export interface OutputMessage {

}

export interface OutputDevice {
  playChord(chord: Chord): void
  stopAllVoices(): void
  getName(): string
}

export interface MidiEvent {
  type: string // i.e. "noteon"
  note: Note
}

export interface WebMidiInput {
  addListener(eventType: string, channel: number | string, handler:(e: MidiEvent) => void): void
  removeListener(): void
  name: string
}

export interface WebMidiOutput {
  playNote(note: any): void,
  stopNote(note: any): void,
  name: string,
}

export interface MidiInitializer {

}
