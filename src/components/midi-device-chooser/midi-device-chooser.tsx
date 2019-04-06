import React from 'react'
import {useStore, State, useActions, Actions} from 'easy-peasy'
import { InputDevice, OutputDevice } from '../../types/interfaces';
import { IGlobalStore } from '../../store/store-types';
import { render } from 'enzyme';

type Props = {

}

const activeColor = '#f66355'
const inactiveColor = '#28374f';

const MidiDeviceChoice = (props: any) => {
    const {device, activeDevice, setActive} = props
    const style = device === activeDevice ?  {color: activeColor} : {color: inactiveColor}

    return (
    <div>
      <a onClick={() => setActive(device)} style={style}>{device.getName()}</a>
    </div>
  )
}

export default function MidiDeviceChooser(props: Props) {
  const activeInput = (useStore((state: State<IGlobalStore>) => state.midiDevices.activeInput) as InputDevice)
  const setActiveInput = useActions((actions: Actions<IGlobalStore>) => actions.midiDevices.selectedActiveInput)
  const inputs: InputDevice[] = useStore((state: State<IGlobalStore>) => state.midiDevices.inputDevices)
  const inputComponents = inputs.map((input: InputDevice) => {

    return (
      <MidiDeviceChoice
        key={input.getName()}
        device={input}
        activeDevice={activeInput}
        setActive={setActiveInput}
      />
    )
  })

  const activeOutput = (useStore((state: State<IGlobalStore>) => state.midiDevices.activeOutput) as OutputDevice)
  const setActiveOutput = useActions((actions: Actions<IGlobalStore>) => actions.midiDevices.selectedActiveOutput)
  const outputs: OutputDevice[] = useStore((state: State<IGlobalStore>) => state.midiDevices.outputDevices)
  const outputComponents = outputs.map((output: OutputDevice) => {

    return (
      <MidiDeviceChoice
        key={output.getName()}
        device={output}
        activeDevice={activeOutput}
        setActive={setActiveOutput}
      />
    )
  })

  return (
    <div>
      <h2>Inputs</h2>
      <div>
        {inputComponents}
      </div>
      <h2>Outputs</h2>
      <div>
        {outputComponents}
      </div>
    </div>
  )
}
