import {Observable} from 'rxjs'
import {Chord, Note} from './model-interfaces'
import {Input, Output} from 'webmidi'

export interface InputMessage {
  note: Note,
  notes: Note[],
  pressed: boolean,
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
  playNote(note: Note): void
  stopNote(note: Note): void
  stopAllVoices(): void
  getName(): string
}

export interface MidiEvent {
  type: string // i.e. "noteon"
  note: Note
}

export type WebMidiInput = Input

export type WebMidiOutput = Output

export interface MidiInitializer {

}
