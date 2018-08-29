import {Observable} from 'rx'
import {logBefore as log} from '../../Logger'
// import Config from '../../Config'
import {
  InputDevice,
  // InputMessage,
  WebMidiInput,
  MidiEvent,
} from '../interfaces'
import {Note} from '../../model-interfaces'

export default class WebMidiInputWrapper implements InputDevice {
  heldDownNotes: Array<Note> = []
  observable: Observable<Array<Note>>
  observer: any

  constructor(private webMidiInput: WebMidiInput) {
    webMidiInput.addListener('noteon', 'all', e => this.noteOn(e))
    webMidiInput.addListener('noteoff', 'all', e => this.noteOff(e))

    this.observable = Observable.create((observer: any) => {
      this.observer = observer
    })
  }

  getCurrentlyHeldDownNotes(): Array<Note> {
    return this.heldDownNotes
  }

  @log('debug')
  noteOff(e: MidiEvent) {
    const targetNoteNumber = e.note.number
    const arrayMember = this.heldDownNotes.find(note => note.number === targetNoteNumber)
    this.heldDownNotes.splice(this.heldDownNotes.indexOf(arrayMember), 1)
    this.observer.next([...this.heldDownNotes])
  }


  @log('debug')
  noteOn(e: MidiEvent) {
    this.heldDownNotes.push(e.note)
    this.observer.next([...this.heldDownNotes])
  }

  destroy() {
    this.webMidiInput.removeListener()
  }

  getName() {
    return this.webMidiInput.name
  }
}
