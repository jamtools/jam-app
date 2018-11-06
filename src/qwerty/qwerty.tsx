import React, {Component} from 'react'

// import { sendChordKeyPress, sendControlKeyPress } from './actions'

type State = {
  keysHeld: any[]
}

type Props = {
  mappedKeys: any,
}

export class Qwerty extends Component<Props, State> {
  static propTypes = {
  }

  state = {
    keysHeld: [] as any[],
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  setKeysHeld = (ls: any[]) => {

  }

  isKeyCurrentlyHeld = (key: any) => {
    return this.state.keysHeld.indexOf(key) !== -1
  }

  handleKeyUp = (e: KeyboardEvent) => {
    const {key} = e
    if(!this.isKeyCurrentlyHeld(key)) {
      return
    }
    const index = this.state.keysHeld.indexOf(key)
    const ls = [...this.state.keysHeld]
    ls.splice(index, 1)
    this.setState({keysHeld: ls})
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const {key} = e
    if(this.isKeyCurrentlyHeld(key)) {
      return
    }

    const ls = [...this.state.keysHeld]
    ls.push(key)
    this.setState({keysHeld: ls})

    const {mappedKeys} = this.props

    if(Object.keys(mappedKeys).indexOf(key) !== -1) {
      return mappedKeys[key]()
    }
  }

  render() {

    return (
      <div />
    )
  }
}

export default Qwerty
