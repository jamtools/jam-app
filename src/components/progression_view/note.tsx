import React from 'react'
import { Button } from 'react-bootstrap';
import { Note } from '../../types/model-interfaces';

import styles from './progression_view.scss'

type Props = {
  note: Note,
}

export default function NoteComponent(props: Props) {
  const {note} = props

  return (
    <div className={styles.noteNameContainer}>
      <span className={styles.chordName}>
        {note.name}
      </span>
    </div>
  )
}
