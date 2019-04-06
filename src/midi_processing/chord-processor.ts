import {Note, Chord} from '../types/model-interfaces'

export const cycle = (x: number) => x % 12

export function findTriad(notes: Note[]): Chord | void {
  const sorted = notes.sort((n1, n2) => n1.number - n2.number)

  const root = sorted[0]

  const third = sorted.find(n => cycle(n.number) === cycle(root.number + 3) || cycle(n.number) === cycle(root.number + 4))
  if (!third) {
    return
  }
  const fifth = sorted.find(n => cycle(n.number) === cycle(root.number + 7))
  if (!fifth) {
    return
  }

  return {notes: [root, third, fifth]}
}
