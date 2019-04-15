import React from 'react'
import {useStore, useActions, State, Actions} from 'easy-peasy'

import {UserControls, IGlobalStore} from '../../store/store-types'
import { INumberNumberMap } from '../../util/interfaces';

export interface UserControlsProps {
}

type ControlButton = {
  name: string,
  action: UserControls,
}

export default function UserControlsComponent(props: UserControlsProps) {
  const assignedControls = useStore((state: State<IGlobalStore>) => state.userActions.assignedControls) as INumberNumberMap
  const selectedControl = useStore((state: State<IGlobalStore>) => state.userActions.selectedControl)
  const clickedControl = useActions((actions: Actions<IGlobalStore>) => actions.userActions.clickedControl)

  const buttons: ControlButton[] = [
    {name: 'Next Line', action: UserControls.NextLine},
    {name: 'Delete Chord', action: UserControls.DeleteChord},
    {name: 'Delete Progression', action: UserControls.DeleteProgression},
    {name: 'Save Progression', action: UserControls.SaveProgression},
  ]

  return (
    <div>
      <h1>User Controls</h1>
      {buttons.map(control => {
        const style: any = {display: 'inline-block', marginRight: '20px'}
        const existing = Object.keys(assignedControls as INumberNumberMap).find(
          (noteNumber: any) => noteNumber && assignedControls[noteNumber] === control.action
        )
        if (existing) {
          style.backgroundColor = 'green'
        }
        if (selectedControl === control.action) {
          style.backgroundColor = 'blue'
        }

        return (
          <div style={style} key={control.action}>
            <h2>{control.name}</h2>
            {existing && <h2>{existing % 12}</h2>}
            <button onClick={() => clickedControl(control.action)}>Assign</button>
            <button>Do</button>
          </div>
        )
      })}
    </div>
  )
}
