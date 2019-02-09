import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import {useStore, State} from 'easy-peasy'

import styles from './progression_view.scss'
import { Chord, Note } from '../../types/model-interfaces'
import DumbPiano from '../dumb-piano'
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
  const chords: Chord[] = useStore((state: State<IGlobalStore>) => state.progressions.chords)

  const groups = getGroupsOfChords(chords)

  if (!chords) {
    return <h1>No progression</h1>
  }

  return (
    groups.map((group: Chord[]) => (
      <div className={styles.progressionContainer}>
        {group.map((chord: Chord, i: number) => (
          <ChordComponent chord={chord} key={i} />
        ))}
        {/* <h1 className={styles.heading}>
          <pre>
          {JSON.stringify(chords.map(chord => chord.notes[0].name), null, 2)}
          </pre>
        </h1> */}
      </div>
    ))
  )
}

export default ProgressionView
