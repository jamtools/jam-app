declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module 'note-to-frequency' {
  export default function noteToFrequency(note: string): number
}

declare module 'react-piano' {
  export const Piano: any
  export const KeyboardShortcuts: any
  export const MidiNumbers: any
}
