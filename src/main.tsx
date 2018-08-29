import React from 'react'
import MidiAndAudioContainer from './components/midi_and_audio_container'
import Piano from './components/piano'

export class Main extends React.PureComponent {
  
  render() {
    return (
    <div>
      <Piano />
      {/* <MidiAndAudioContainer /> */}
    </div>
    )
  }
}
