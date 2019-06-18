import React from 'react'
import {useStore, State} from 'easy-peasy'

import styles from './progression_view.scss'
import { Chord, Note, Progression, Scale } from '../../types/model-interfaces'
import { IGlobalStore } from '../../store/store-types'

import ChordComponent from './chord'

type Props = {

}

const getGroupsOfChords = (chords: Chord[]) => {
  const copy = [...chords]
  const result = []

  while (copy.length) {
    result.push( copy.splice(0, 4) )
  }
  return result;
}

const ProgressionView = (props: Props) => {
  const progressions: Progression[] = useStore((state: State<IGlobalStore>) => state.progressions.progressions)
  const scale: Scale = useStore((state: State<IGlobalStore>) => state.progressions.currentScale)

  // const groups = getGroupsOfChords(chords)


  return (
    <React.Fragment>
      {scale && <h1>{scale.root} {scale.quality}</h1>}

      {progressions.length === 0 && (
        <h1>No progression</h1>
      )}

      {progressions.map((progression, i) => (
        <div key={i} className={styles.progressionContainer}>
          {progression.chords.map((chord: Chord, i: number) => (
            <ChordComponent chord={chord} key={i} />
          ))}
          {/* <h1 className={styles.heading}>
            <pre>
            {JSON.stringify(chords.map(chord => chord.notes[0].name), null, 2)}
            </pre>
          </h1> */}
        </div>
      ))}
    </React.Fragment>
  )
}

export default ProgressionView
