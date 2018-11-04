import React, {createContext, createElement, useState} from 'react'

const Context = React.createContext({})
const Provider = Context.Provider

type Props = {
  value?: object,
  children: React.ReactChildren,
}

const ProgressionProvider = (props: Props) => {
  const [state, setState] = useState(props.value || {dude: 'yop'})

  return (
    <Context.Provider value={{state, setState}}>
      {props.children}
    </Context.Provider>
  )
}

export default {
  Consumer: Context.Consumer,
  Provider: ProgressionProvider,
} as any
