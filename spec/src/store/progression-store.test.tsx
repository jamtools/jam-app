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

describe('ProgressionStore', () => {

  beforeEach(async () => {
    store.dispatch.progressions.updateProgressions([{chords: []}])
    return wait()
  })

  describe('addChordToProgression', () => {
    it('adds a chord to the progression', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.progressions[0].chords
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

      capturedChords = store.getState().progressions.progressions[0].chords
      console.log(store.getState().progressions.progressions)
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })

  describe('updateProgressions', () => {
    it('sets progression to passed-in parameter', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.progressions[0].chords
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

      store.dispatch.progressions.updateProgressions([{
        chords: [chord]},
      ])

      await wait()

      capturedChords = store.getState().progressions.progressions[0].chords
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })

  describe('updateProgressionsFromMessage', () => {
    it('sets progression to passed-in websocket message', async () => {
      let capturedChords

      capturedChords = store.getState().progressions.progressions[0].chords
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

      store.dispatch.websocket.handleMessage({type: 'updateProgressions', data: [
        {chords: [chord]},
      ]})

      await wait()

      capturedChords = store.getState().progressions.progressions[0].chords
      chai.expect(capturedChords).to.deep.equal([chord])
    })
  })
})
