import {IStringTMap} from '../../../src/util/interfaces'

import {WebMidiInput, MidiEvent} from '../../../src/midi_devices/interfaces'
import {Note} from '../../../src/model-interfaces'

export default class MockMidiInputDevice implements WebMidiInput {
  handlers: IStringTMap<(e: MidiEvent) => void> = {}
  name: string = 'Mock Midi Input'

  addListener(eventType: string, channel: number | string, handler:(e: MidiEvent) => void): void {
    this.handlers[eventType] = handler
  }

  removeListener(): void {
  }

  sendMidiEvent(e: MidiEvent) {
    this.handlers[e.type](e)
  }

  sendNoteOn(n: Note) {
    this.handlers.noteon({
      type: 'noteon',
      note: n,
    })
  }

  sendNoteOff(n: Note) {
    this.handlers.noteoff({
      type: 'noteoff',
      note: n,
    })
  }
}
