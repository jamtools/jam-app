import {useState} from 'React'

interface ProgressionHookState {

}

function pressedKey(state: ProgressionHookState): ProgressionHookState {


  return {
    ...state,
  }
}

export function useProgressionHook(initialState: ProgressionHookState) {
  const [state, setState] = useState(initialState)

  const actions = {
    pressedKey,
  }

  return [state, actions]
}
