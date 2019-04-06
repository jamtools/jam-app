import React from 'react'
import classnames from 'classnames'

import { Chord } from '../../types/model-interfaces'

import styles from './progression_view.scss'
import ChordName from './chord-name'
import DumbPiano from '../dumb-piano';

type Props = {
  chord: Chord,
}

export default function ChordComponent(props: Props) {
  const {chord} = props

  const selected = Math.random() > 0.5
  const selectedClass = selected ? styles.selectedChord : ''

  return (
    <div className={classnames(styles.entireChordContainer, selectedClass)}>
      <DumbPiano
        height='100px'
        playNote={() => console.log('special')}
        // noteRange={{ first: firstNote, last: lastNote }}
        width={200}
        // keyboardShortcuts={keyboardShortcuts}
        heldDownNotes={chord.notes}
      />
      <ChordName chord={chord} />
    </div>
  )
}
