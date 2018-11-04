import React, {useContext} from 'react'

import styles from './progression_view.scss'
import ProgressionContext from '../../contexts/progression-context'

type Props = {

}

const ProgressionView = (props: Props) => {
  const {state, setState} = useContext(ProgressionContext.Consumer)

  return (
    <h1 className={styles.heading}>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </h1>
  )
}

export default ProgressionView
