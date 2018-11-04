import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import * from as $ from 'jquery'

import { sendChordKeyPress, sendControlKeyPress } from './actions'

type State = {
  keysHeld: any[]
}

export class Qwerty extends Component<{}, State> {
  static propTypes = {
  }

  state = {
    keysHeld: [],
  }

  componentDidMount() {
    $(document).on('keydown', this.handleKeyDown)
    $(document).on('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    $(document).off('keydown')
    $(document).off('keyup')
  }

  setKeysHeld = (ls) => {

  }

  isKeyCurrentlyHeld = (key) => {
    return this.state.keysHeld.includes(key)
  }

  handleKeyUp = (e) => {
    const {key} = e
    if(!this.isKeyCurrentlyHeld(key)) {
      return
    }
    const index = this.state.keysHeld.indexOf(key)
    const ls = [...this.state.keysHeld]
    ls.splice(index, 1)
    this.setState({keysHeld: ls})
  }

  handleKeyDown = (e) => {
    const {key} = e
    if(this.isKeyCurrentlyHeld(key)) {
      return
    }

    const ls = [...this.state.keysHeld]
    ls.push(key)
    this.setState({keysHeld: ls})

    const {mappedKeys} = this.props

    if(Object.keys(mappedKeys).includes(key)) {
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
