import noteToFrequency from 'note-to-frequency'

import {OutputDevice, OutputMessage} from '../../types/interfaces'
import {Chord, Note} from '../../types/model-interfaces'

type ActiveNote = {
  note: Note,
  oscillator: OscillatorNode,
}

export default class SoftwareSynthOutput implements OutputDevice {
  private synth: any
  private activeNotes: ActiveNote[]

  constructor() {
    this.activeNotes = []
  }

  getName() {
    return 'Software Synth'
  }

  send(msg: OutputMessage) {

  }

  playChord(chord: Chord) {
    this.activeNotes.forEach(o => {
      o.stop()
      o.disconnect()
    })

    this.activeNotes = []

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = chord.notes
    notes.forEach((note: Note) => this.playNote(note, audioCtx))
  }

  playNote(note: Note, audioCtx?: AudioContext) {
    this.stopNote(note)

    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();

    const freq = noteToFrequency(`${note.name}${note.octave + 1}`)
    const oscillator = audioCtx.createOscillator();

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime)
    oscillator.maxGain = 0.1
    oscillator.connect(audioCtx.destination)
    oscillator.start()
    this.activeNotes.push({
      note,
      oscillator,
    })
  }

  stopNote(note: Note) {
    const index = this.activeNotes.findIndex(an => an.note.number === note.number)
    if (index === -1) {
      return
    }

    const activeNote = this.activeNotes[index]
    activeNote.oscillator.stop()
    activeNote.oscillator.stop()

    const activeNotes = [...this.activeNotes]
    activeNotes.splice(index, 1)
    this.activeNotes = activeNotes
  }

  stopAllVoices() {
    this.synth.stop()
  }
}
