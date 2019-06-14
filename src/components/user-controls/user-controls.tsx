import React from 'react'
import {useStore, useActions, State, Actions, Action} from 'easy-peasy'

import {UserControls, IGlobalStore} from '../../store/store-types'
import { INumberNumberMap } from '../../util/interfaces';

export interface UserControlsProps {
}

type ControlButtonConfig = {
  name: string,
  key: UserControls,
}

export default function UserControlsComponent(props: UserControlsProps) {
  const assignedControls = useStore((state: State<IGlobalStore>) => state.userActions.assignedControls) as INumberNumberMap
  const selectedControl = useStore((state: State<IGlobalStore>) => state.userActions.selectedControl)
  const clickedAssign = useActions((actions: Actions<IGlobalStore>) => actions.userActions.clickedAssign)
  const clickedDo = useActions((actions: Actions<IGlobalStore>) => actions.userActions.clickedDo)

  const buttons: ControlButtonConfig[] = [
    {name: 'Next Line', key: UserControls.NextLine},
    {name: 'Delete Chord', key: UserControls.DeleteChord},
    {name: 'Delete Progression', key: UserControls.DeleteProgression},
    {name: 'Save Progression', key: UserControls.SaveProgression},
  ]

  return (
    <div>
      <h1>User Controls</h1>
      {buttons.map(control => {
        const style: any = {display: 'inline-block', marginRight: '20px'}
        const existing = Object.keys(assignedControls as INumberNumberMap).find(
          (noteNumber: any) => noteNumber && assignedControls[noteNumber] === control.key
        )
        if (existing) {
          style.backgroundColor = 'green'
        }
        if (selectedControl === control.key) {
          style.backgroundColor = 'blue'
        }

        return (
          <div style={style} key={control.action}>
            <h2>{control.name}</h2>
            {existing && <h2>{existing % 12}</h2>}
            <button onClick={() => clickedAssign(control.key)}>Assign</button>
            <button onClick={() => clickedDo(control.key)}>Do</button>
          </div>
        )
      })}
    </div>
  )
}
