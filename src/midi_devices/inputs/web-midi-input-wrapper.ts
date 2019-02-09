import {Observable, BehaviorSubject} from 'rxjs'
import {logBefore as log} from '../../Logger'
// import Config from '../../Config'
import {
  InputDevice,
  // InputMessage,
  WebMidiInput,
  MidiEvent,
} from '../../types/interfaces'
import {Note} from '../../types/model-interfaces'

export default class WebMidiInputWrapper implements InputDevice {
  heldDownNotes: Array<Note> = []
  observable: BehaviorSubject<Array<Note>>
  observer: any

  constructor(private webMidiInput: WebMidiInput) {
    webMidiInput.addListener('noteon', 'all', e => this.noteOn(e))
    webMidiInput.addListener('noteoff', 'all', e => this.noteOff(e))

    this.observable = new BehaviorSubject<Array<Note>>([])
  }

  getCurrentlyHeldDownNotes(): Array<Note> {
    return this.heldDownNotes
  }

  @log('debug')
  noteOff(e: MidiEvent) {
    const targetNoteNumber = e.note.number
    const arrayMember = this.heldDownNotes.find(note => note.number === targetNoteNumber)
    this.heldDownNotes.splice(this.heldDownNotes.indexOf(arrayMember), 1)
    this.observable.next([...this.heldDownNotes])
  }


  @log('debug')
  noteOn(e: MidiEvent) {
    this.heldDownNotes.push(e.note)
    this.observable.next([...this.heldDownNotes])
  }

  destroy() {
    this.webMidiInput.removeListener()
  }

  getName() {
    return this.webMidiInput.name
  }
}
