import React from 'react'
import TestRenderer from "react-test-renderer"
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import ProgressionContext from '../../../src/contexts/progression-context'

const expect = chai.expect
describe('ProgressionContext', () => {

  beforeEach(() => {
  })

  it('it should return new state when updated', () => {
    const children = sinon.spy()
    const props = {
      value: {yo: 'hey'},
    }
    const component = TestRenderer.create(
      <ProgressionContext.Provider {...props}>
        <ProgressionContext.Consumer>
          {children}
        </ProgressionContext.Consumer>
      </ProgressionContext.Provider>
    )

    const args = children.args[0][0]
    expect(args.state).to.deep.equal({yo: 'hey'})

    args.setState({yo2: 'ya dude'})
    expect(children.args[1][0].state).to.deep.equal({yo2: 'ya dude'})
    expect(children).to.have.been.called
  })
})
