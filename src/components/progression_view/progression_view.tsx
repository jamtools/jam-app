import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import {useStore, State} from 'easy-peasy'

import styles from './progression_view.scss'
import { Chord, Note } from '../../types/model-interfaces'
import DumbPiano from '../dumb-piano'
import { IGlobalStore } from '../../store/store-types';

type Props = {

}

const ProgressionView = (props: Props) => {
  const chords: Chord[] = useStore((state: State<IGlobalStore>) => state.progressions.chords)

  if (!chords) {
    return <h1>No progression</h1>
  }

  const createButton = (chord: Chord, i: number) => {
    return (
      <Button bsStyle='primary' key={i}>
        {chord.notes.map((note: Note, j: number) => (
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
        {chords.map((chord: Chord, i: number) => (
          <div key={i} style={{display: 'inline-block'}}>
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
        <pre>
          {JSON.stringify(chords.map(chord => chord.notes[0].name), null, 2)}
        </pre>
      </h1>
    </div>
  )
}

export default ProgressionView
