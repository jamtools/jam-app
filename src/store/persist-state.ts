const loadState = () => {
  const state = localStorage.getItem('redux-state')
  if (!state) {
    return undefined
  }
  return JSON.parse(state)
}

export const saveState = (state) => {
  if (!state) {
    return
  }
  const toPersist = {
    // users: state.users,
  }
  localStorage.setItem('redux-state', JSON.stringify(toPersist))
}

export const initialState = loadState()
