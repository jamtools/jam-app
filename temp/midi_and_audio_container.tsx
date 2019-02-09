import React from 'react'
import Polysynth from 'subpoly'
import WebMidi from 'webmidi'
import WebMidiInputWrapper from '../midi_devices/inputs/web-midi-input-wrapper'
import WebMidiOutputWrapper from '../midi_devices/outputs/web-midi-output-wrapper'
import ProgrammaticInput from '../midi_devices/inputs/programmatic-input'
import SoftwareSynthOutput from '../midi_devices/outputs/software-synth-output'
import {InputDevice, OutputDevice, WebMidiInput, WebMidiOutput} from '../midi_devices/interfaces'
import {Chord, Note} from '../model-interfaces'
import RecordingModeProcessor from '../midi_processing/recording_mode_processor'
import PlaybackModeProcessor from '../midi_processing/playback_mode_processor'
import Qwerty from '../qwerty/qwerty'

import ActiveInputDevice from '../components/ActiveInputDevice'
import ActiveOutputDevice from '../components/ActiveOutputDevice'

// import midi from './midi'

const synthConfig = {
  maxGain: 0.2,
  waveform: 'sawtooth',
}

const MidiDevice = props => <div />

const MidiDeviceList = props => (
  <div>
    <h1>Midi devices</h1>
    <h2>Inputs</h2>
    {props.inputs.map((device: InputDevice) => device.getName())}
    <h2>Outputs</h2>
    {props.outputs.map((device: OutputDevice) => device.getName())}
  </div>
)

interface MainProps {
  inputs: Array<InputDevice>
  activeInput: InputDevice
  outputs: Array<OutputDevice>
  activeOutput: OutputDevice
  currentMode: string
  chords: Array<Chord>
  heldDownNotes: Array<Note>
}

interface WebMidiLibrary {
  enable:((err: Error) => void)
}

class MidiAndAudioContainer extends React.PureComponent<MainProps & {setState: (a: any) => void}> {
  private playbackModeProcessor: PlaybackModeProcessor
  private recordingModeProcessor: RecordingModeProcessor

  componentDidMount() {
    window.main = this
    this.doStaticInputStuff()
    // this.doOutputSynthStuff()
    this.doWebMidiStuff()
    //this.doOutputSynthStuff()
    window.setNotes = this.setStaticHeldDown.bind(this)
    window.functions = {
      saveChord: () => this.saveChord(),
      playChord: () => this.playbackModeProcessor.playChord(),
      nextChord: () => this.playbackModeProcessor.gotoNextChord(),
      stopPlaying: () => this.playbackModeProcessor.stopPlaying(),
    }
  }

  setActiveOutputDevice(outputDevice: OutputDevice) {
    this.props.setState({
      activeOutput: outputDevice,
    })
    this.playbackModeProcessor = new PlaybackModeProcessor(outputDevice)
  }

  setActiveInputDevice(inputDevice: InputDevice) {
    this.props.setState({
      activeInput: inputDevice,
    })
    this.recordingModeProcessor = new RecordingModeProcessor(inputDevice)
    inputDevice.observable.subscribe((notesArr: Array<Note>) => {
      this.props.setState({heldDownNotes: notesArr})
    })
  }

  setStaticHeldDown(notesArray) {
    this.props.activeInput.setCurrentlyHeldDownNotes(notesArray)
  }

  doStaticInputStuff() {
    const notes: Array<Note> =  [
      {number: 84, name: 'C', octave: 4},
      {number: 88, name: 'E', octave: 4},
      {number: 91, name: 'G', octave: 4},
    ]

    const pInput = new ProgrammaticInput()
    pInput.setCurrentlyHeldDownNotes(notes)
    this.props.setState({
      inputs: this.props.inputs.concat([pInput]),
    })
    this.setActiveInputDevice(pInput)
  }

  doOutputSynthStuff() {
    const synth = this.createSynth()
    const synthOutputDevice = new SoftwareSynthOutput(synth)
    this.props.setState({
      outputs: this.props.outputs.concat([synthOutputDevice])
    })
    this.setActiveOutputDevice(synthOutputDevice)
  }

  doWebMidiStuff() {
    WebMidi.enable((err: Error) => {
      if (err) {
        alert(err)
        return
      }
      debugger
      console.log(WebMidi.inputs)
      console.log(WebMidi.outputs)
      const {inputs, outputs} = WebMidi

      const inputWrappers = inputs.map((input: WebMidiInput) => new WebMidiInputWrapper(input))
      const outputWrappers = outputs.map((output: WebMidiOutput) => new WebMidiOutputWrapper(output))
      this.props.setState({
        // inputs: this.props.inputs.concat(inputWrappers),
        outputs: this.props.outputs.concat(outputWrappers),
      })
      // if(inputWrappers.length) this.setActiveInputDevice(inputWrappers[1])
      if(outputWrappers.length) this.setActiveOutputDevice(outputWrappers[0])
    })
    window.WebMidi = WebMidi

  }

  createSynth() {
    const audioCtx = new AudioContext()
    const synth = new Polysynth(audioCtx, synthConfig)
    console.log(synth)
    console.log(synth.voices)
    window.synth = synth
    return synth
  }

  saveChord = () => {
    const chord: Chord = this.recordingModeProcessor.saveChord()
    const chords = this.props.chords.concat([chord])
    this.props.setState({chords})
    this.playbackModeProcessor.setChords(chords)
  }



  render() {
    const {inputs, activeInput, outputs, activeOutput, chords, heldDownNotes} = this.props
    return (
      <div>
        {/*<h1>Main</h1>
        <MidiDeviceList {...{outputs, inputs, activeOutput, activeInput}} />
        {activeInput && <ActiveInputDevice input={activeInput} heldDownNotes={heldDownNotes} />}
        {activeOutput && <ActiveOutputDevice output={activeOutput} />}
        <h2>Chords</h2>
        {chords.map((chord: Chord) => (
          <pre>{JSON.stringify(chord, null, 2)}</pre>
        ))}*/}
        <button onClick={() => this.saveChord()}>Save Chord</button>
        <button onClick={() => this.playbackModeProcessor.playChord()}>Play Chord</button>
        <button onClick={() => this.playbackModeProcessor.gotoNextChord()}>Next Chord</button>
        <button onClick={() => this.playbackModeProcessor.stopPlaying()}>Stop Playing</button>
        <Qwerty
          mappedKeys={{
            'c': this.saveChord,
            'm': () => this.playbackModeProcessor.playChord(),
            'ContextMenu': () => this.playbackModeProcessor.gotoNextChord(),
            'ArrowDown': () => this.playbackModeProcessor.stopPlaying(),
          }}
        />
      </div>
    )
  }
}

export default MidiAndAudioContainer
