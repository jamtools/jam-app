import React from 'react'
import {IStringTMap} from '../util/interfaces'
import {OutputDevice} from '../types/interfaces'
import {Chord, Note} from '../types/model-interfaces'

interface IProps {
  output: OutputDevice
}

export default class ActiveOutputDevice extends React.Component<IProps> {
  render() {
    const {output} = this.props
    return (
      <div>
        <h2>Active Output</h2>
        {output.getName()}
      </div>
    )
  }
}
