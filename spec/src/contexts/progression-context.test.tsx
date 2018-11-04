import React from 'react'
import TestRenderer from "react-test-renderer"
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import ProgressionContext, {ProgressionProvider, ProgressionContextValue} from '../../../src/contexts/progression-context'

const makeComponent = (props, children) => {
  return TestRenderer.create(
    <ProgressionProvider {...props}>
      <ProgressionContext.Consumer>
        {children}
      </ProgressionContext.Consumer>
    </ProgressionProvider>
  )
}

const expect = chai.expect
describe('ProgressionContext', () => {

  beforeEach(() => {
  })

  it('sets initial state', () => {
    const children = sinon.spy()
    const props = {
      chords: [],
    }
    const component = makeComponent(props, children)

    const firstRender = children.args[0][0] as ProgressionContextValue
    const action = firstRender.actions.addChordToProgression

    const note = {
      number: 84,
      name: 'C',
      octave: 5,
    }
    const chord = {notes: [note]}
    action(chord)

    const secondRender = children.args[1][0] as ProgressionContextValue
    expect(secondRender.state).to.deep.equal({chords: [chord]})

    // args.setState({yo2: 'ya dude'})
    // expect(children.args[1][0].state).to.deep.equal({progressionState: {yo2: 'ya dude'}})
    // expect(children).to.have.been.called
  })
})
