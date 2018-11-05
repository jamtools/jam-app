import React, {useContext} from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

import styles from './progression_view.scss'
import ProgressionContext, { ProgressionContextValue } from '../../contexts/progression-context'
import { Chord } from '../../model-interfaces'
import DumbPiano from '../dumb-piano'

type Props = {

}

const ProgressionView = (props: Props) => {
  const {state: progressionState, actions: setProgressionActions} = useContext(ProgressionContext) as ProgressionContextValue

  if (!progressionState || !progressionState.chords) {
    return <h1>No progression</h1>
  }

  const createButton = (chord, i) => {
    return (
      <Button bsStyle='primary' key={i}>
        {chord.notes.map((note, j: number) => (
          <span key={j} className={styles.chordName}>
            {note.name}
          </span>
        ))}
      </Button>
    )
  }

  return (
    <div>
      <ButtonGroup>
        {progressionState.chords.map((chord: Chord, i: number) => (
          <div style={{display: 'inline-block'}}>
            <DumbPiano
              height='100px'
              playNote={() => console.log('special')}
              // noteRange={{ first: firstNote, last: lastNote }}
              width={200}
              // keyboardShortcuts={keyboardShortcuts}
              heldDownNotes={chord.notes}
            />
            {createButton(chord, 3)}
          </div>
        ))}
      </ButtonGroup>
      <h1 className={styles.heading}>
        {/* <button onClick={() => setProgressionState({l: 'k'})}>Press me</button> */}
        <pre>
          {JSON.stringify(progressionState.chords.map(chord => chord.notes[0].name), null, 2)}
        </pre>
      </h1>
    </div>
  )
}

export default ProgressionView
