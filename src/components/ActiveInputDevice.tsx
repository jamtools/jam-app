import React from 'react'
import {InputDevice} from '../types/interfaces'
import {NoteCollection, Note} from '../types/model-interfaces'

interface IProps {
  input: InputDevice
  heldDownNoteCollection: NoteCollection
}

export default class ActiveInputDevice extends React.Component<IProps> {

  render() {
    const {input, heldDownNoteCollection} = this.props
    return (
      <div>
        <h2>Active Input</h2>
        {input.getName()}
        {heldDownNoteCollection.notes.map((note: Note) => (
          <pre>{JSON.stringify(note, null, 2)}</pre>
        ))}
      </div>
    )
  }
}
