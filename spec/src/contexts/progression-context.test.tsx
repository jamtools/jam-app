import React from 'react'
import TestRenderer from "react-test-renderer"
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import ProgressionContext, {ProgressionProvider, ProgressionContextValue} from '../../../src/contexts/progression-context'
import {WebsocketProvider} from '../../../src/contexts/websocket-context'

const makeComponent = (props, children) => {
  return TestRenderer.create(
    <WebsocketProvider>
      <ProgressionProvider {...props}>
        <ProgressionContext.Consumer>
          {children}
        </ProgressionContext.Consumer>
      </ProgressionProvider>
    </WebsocketProvider>
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
    expect(secondRender.state).to.deep.equal({chords: [chord], initialized: true})
  })
})
