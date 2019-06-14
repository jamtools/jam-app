import {BehaviorSubject} from 'rxjs'
import {InputDevice, InputMessage} from '../../types/interfaces'
import {Note} from '../../types/model-interfaces'

export default class ProgrammaticInput implements InputDevice {
  heldDownNotes: Array<Note> = []
  observable: BehaviorSubject<InputMessage> = new BehaviorSubject<InputMessage>({notes: []})

  getName() {
    return 'Programmatic Input'
  }

  noteOff(note: Note) {
    const targetNoteNumber = note.number
    const index = this.heldDownNotes.findIndex(note => note.number === targetNoteNumber)
    this.heldDownNotes.splice(index, 1)
    this.observable.next({pressed: false, note, notes: [...this.heldDownNotes]})
  }

  // @log('debug')
  noteOn(note: Note) {
    this.heldDownNotes.push(note)
    this.observable.next({pressed: true, note, notes: [...this.heldDownNotes]})
  }

  setCurrentlyHeldDownNotes(notes: Array<Note>) {
    this.heldDownNotes = notes
    this.observable.next(notes)
  }

  getCurrentlyHeldDownNotes(): Array<Note> {
    return this.heldDownNotes
  }
}
