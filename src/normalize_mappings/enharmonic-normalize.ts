const enharmonics: Record<string, Record<string, string>> = {
  'Ab': {
    'B': 'Cb',
  },
  'Cb': {
    'B': 'Cb',
    'A#': 'Bb',
    'E': 'Fb',
  },
  'C': {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
  },
  'C#': {
    'Eb': 'D#',
    'Bb': 'A#',
  },
  'Db': {
    'B': 'Cb',
    'F#': 'Gb',
  },
  'D': {
    'D#': 'Eb',
    'A#': 'Bb',
    'Gb': 'F#',
  },
  'E': {
    'Ab': 'G#',
    'A#': 'Bb',
    'D#': 'Eb',
    'Db': 'C#',
    'Eb': 'D#',
  },
  'F': {
    'A#': 'Bb',
    'F#': 'Gb',
    'C#': 'Db',
    'D#': 'Eb',
    'G#': 'Ab',
  },
  'F#': {
    'Bb': 'A#',
    'Eb': 'D#',
  },
  'Gb': {
    'A#': 'Bb',
    'D#': 'Eb',
    'G#': 'Ab',
    'B': 'Cb',
    'E': 'Fb',
  },
  'G': {
    'A#': 'Bb',
    'D#': 'Eb',
    'G#': 'Ab',
    'C#': 'Db',
  },
  'G#': {
    'A#': 'Bb',
    'D#': 'Eb',
    'Cb': 'B#',
  },
  'Am': {
    'Gb': 'G',
    'G#': 'Ab',
    'F#': 'Gb',
    'C#': 'Db',
    'D#': 'Eb',
    'A#': 'Bb',
  },
  'Bbm': {
    'Cb': 'B',
    'Gb': 'F#',
  },
  'Bm': {
    'A#': 'Bb',
    'D#': 'Eb',
  },
  'C#m': {
    'A#': 'Bb',
    'D#': 'Eb',
    'Gb': 'F#',
  },
  'Cm': {
    'G#': 'Ab',
    'A#': 'Bb',
    'D#': 'Eb',
    'F#': 'Gb',
    'C#': 'Db',
  },
  'Dm': {
    'A#': 'Bb',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'C#': 'Db',
  },
  'Em': {
    'A#': 'Bb',
    'D#': 'Eb',
    'C#': 'Db',
  },
  'F#m': {
    'A#': 'Bb',
    'D#': 'Eb',
    'Gb': 'F#',
    'Ab': 'G#',
    'Db': 'C#',
  },
  'Fm': {
    'G#': 'Ab',
    'A#': 'Bb',
    'D#': 'Eb',
    'F#': 'Gb',
    'C#': 'Db',
  },
  'Gm': {
    'G#': 'Ab',
    'A#': 'Bb',
    'D#': 'Eb',
    'C#': 'Db',
    'F#': 'Gb',
  },
  'G#m': {
    'A#': 'Bb',
    'D#': 'Eb',
  },
  'B': {
    'Eb': 'D#',
  }
};

export default enharmonics;
