import React from 'react'
import WebMidi from 'webmidi'
import WebMidiInputWrapper from '../inputs/web-midi-input-wrapper'
import WebMidiOutputWrapper from '../outputs/web-midi-output-wrapper'
import {InputDevice, OutputDevice, WebMidiInput, WebMidiOutput} from '../../types/interfaces'
import {Chord, Note} from '../../types/model-interfaces'
import PlaybackModeProcessor from '../../midi_processing/playback_mode_processor';
import RecordingModeProcessor from '../../midi_processing/recording_mode_processor';
import ProgrammaticInput from '../inputs/programmatic-input';

interface WebMidiLibrary {
  enable:((err: Error) => void)
}

type Callback = (inputs: InputDevice[], outputs: OutputDevice[]) => void
export default function connectMidi(callback: Callback) {
  WebMidi.enable((err) => {
    if (err) {
      alert(err)
      return
    }
    const {inputs, outputs} = WebMidi

    const inputWrappers = inputs.map((input: WebMidiInput) => new WebMidiInputWrapper(input))
    const outputWrappers = outputs.map((output: WebMidiOutput) => new WebMidiOutputWrapper(output))
    callback(inputWrappers, outputWrappers)
  })
  window.WebMidi = WebMidi
  }
