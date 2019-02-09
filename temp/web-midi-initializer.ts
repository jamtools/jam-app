export WebMidiInitializer
WebMidi.enable((err: Error) => {
  if (err) {
    alert(err)
    return
  }
  console.log(WebMidi.inputs)
  console.log(WebMidi.outputs)
  const {inputs, outputs} = WebMidi

  const inputWrappers = inputs.map((input: WebMidiInput) => new WebMidiInputWrapper(input))
  const outputWrappers = outputs.map((output: WebMidiOutput) => new WebMidiOutputWrapper(output))
  this.setState({
    inputs: this.state.inputs.concat([inputWrappers[2]]),
    outputs: this.state.outputs.concat([outputWrappers[1]]),
  })
  if(inputWrappers.length) this.setActiveInputDevice(inputWrappers[2])
  if(outputWrappers.length) this.setActiveOutputDevice(outputWrappers[1])
})
window.WebMidi = WebMidi
