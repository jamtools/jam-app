import Soundfont, { InstrumentName, Player } from 'soundfont-player'

import {OutputDevice, OutputMessage} from '../../types/interfaces'
import {Chord, Note} from '../../types/model-interfaces'

export default class SoundfontOutput implements OutputDevice {
  private soundfont: Player
  private oscillators: OscillatorNode[]

  constructor(name?: InstrumentName) {
    const instrumentName = name || 'clavinet'
    const audioContext = new (
      (window as any).AudioContext ||
      (window as any).webkitAudioContext
      )()

    Soundfont.instrument(audioContext, instrumentName).then(instrument => {
      this.soundfont = instrument
    })
  }

  getName() {
    return 'Soundfont'
  }

  send(msg: OutputMessage) {

  }

  playChord(chord: Chord) {
    this.soundfont.stop()
    chord.notes.forEach(note => {
      this.playNote(note)
    })
  }

  playNote(note: Note) {
    this.soundfont.play(note.number.toString())
  }

  stopNote(note: Note) {
    this.soundfont.play(note.number.toString())
  }

  stopAllVoices() {
    this.soundfont.stop()
  }
}
