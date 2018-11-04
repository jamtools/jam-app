import React from 'react'
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import * as ProgressionHook from '../../../src/hooks/local-progression-hook'
import { Chord } from '../../../src/model-interfaces'

const createChord = (): Chord => {
  return {
    notes: [
      {name: 'C', octave: 5, number: 85}
    ]
  }
}

const expect = chai.expect
describe('ProgressionHook', () => {
  let state
  let useState
  let returnedState
  let fakeSetState
  let setState

  beforeEach(() => {
    state = {chords: []}
    returnedState = null

    fakeSetState = (fn => {
      returnedState = fn(state)
    })
    setState = sinon.spy(fakeSetState)
    useState = () => [state, setState]
  })

  it('should add a chord to the progression', () => {
    const useContext = () => ({state: {}, actions: {sendMessage: sinon.spy()}})
    const hook = ProgressionHook.useProgressionHook({chords: []}, {useState, useContext})
    expect(hook[0]).to.deep.equal(state)
    expect(setState).not.to.have.been.called

    const chord = createChord()
    hook[1].addChordToProgression(chord)
    expect(setState).to.have.been.called
    expect(returnedState).to.deep.equal({chords: [chord]})
  })
})
