import React from 'react'
import TestRenderer from 'react-test-renderer'
import sinon from 'sinon'
import * as mocha from 'mocha'
import chai from 'chai'

import {StoreProvider} from 'easy-peasy'

import store, {StoreInit} from '../../../src/store/store'
import { Chord } from '../../../src/types/model-interfaces'

const wait = () => new Promise((r => {
  setTimeout(r, 0)
}))

describe('ProgressionContext', () => {

  beforeEach(async () => {
    store.dispatch.progressions.updateProgression([])
    return wait()
  })

  describe('addChordToProgression', () => {
    it('adds a chord to the progression', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([])

      const chord: Chord = {
        notes: [
          {
            number: 84,
            name: 'C',
            octave: 5,
          }
        ]
      }

      store.dispatch.progressions.addChordToProgression(chord)

      await wait()

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })

  describe('updateProgression', () => {
    it('sets progression to passed-in parameter', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([])

      const chord: Chord = {
        notes: [
          {
            number: 84,
            name: 'C',
            octave: 5,
          }
        ]
      }

      store.dispatch.progressions.updateProgression([chord])

      await wait()

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })

  describe('updateProgressionFromMessage', () => {
    it('sets progression to passed-in websocket message', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([])

      const chord: Chord = {
        notes: [
          {
            number: 84,
            name: 'C',
            octave: 5,
          }
        ]
      }

      store.dispatch.progressions.updateProgressionFromMessage({type: 'updateProgression', data: [chord]})

      await wait()

      capturedChords = store.getState().progressions.chords
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })
})
