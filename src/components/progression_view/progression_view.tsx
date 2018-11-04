import React, {useContext} from 'react'

import styles from './progression_view.scss'
import ProgressionContext from '../../contexts/progression-context'
import { Chord } from '../../model-interfaces';

type Props = {

}

const ProgressionView = (props: Props) => {
  const {state: progressionState, actions: setProgressionActions} = useContext(ProgressionContext)
  console.log(progressionState)

  return (
    <div>
      <div>
      {progressionState.chords.map((chord: Chord, i: number) => (
        <span key={i}>
          {chord.notes.map((note, j: number) => (
            <span key={j} className={styles.chordName}>
              {note.name}
            </span>
          ))}
        </span>
      ))}
      </div>
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
