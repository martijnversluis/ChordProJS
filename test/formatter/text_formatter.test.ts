import { TextFormatter } from '../../src';
import '../matchers';
import { exampleSongSolfege, exampleSongSymbol } from '../fixtures/song';
import songWithIntro from '../fixtures/song_with_intro';

import {
  chordLyricsPair, createSongFromAst, heredoc, tag,
} from '../utilities';

describe('TextFormatter', () => {
  it('formats a symbol song to a text chord sheet correctly', () => {
    const expectedChordSheet = heredoc`
      LET IT BE
      ChordSheetJS example version
      
      Written by: John Lennon,Paul McCartney
      
      Verse 1
             Am         C/G        F          C
      Let it be, let it be, let it be, let it be
      D                G  A           G  D/F# Em D
      Whisper words of wisdom, let it be
      
      Breakdown
      Em               F              C  G
      Whisper words of wisdom, let it be
      
      Bridge 1
      Bridge line
      
      Grid 1
      Grid line
      
      Tab 1
      Tab line`;

    expect(new TextFormatter().format(exampleSongSymbol)).toEqual(expectedChordSheet);
  });

  it('formats a solfege song to a text chord sheet correctly', () => {
    const expectedChordSheet = `
LET IT BE
ChordSheetJS example version

Written by: John Lennon,Paul McCartney

Verse 1
       Lam        Do/Sol     Fa         Do
Let it be, let it be, let it be, let it be
Re               Sol La          Sol Re/Fa# Mim Re
Whisper words of wis dom, let it be

Breakdown
Mim              Fa             Do Sol
Whisper words of wisdom, let it be

Bridge 1
Bridge line

Grid 1
Grid line

Tab 1
Tab line`.substring(1);

    expect(new TextFormatter().format(exampleSongSolfege)).toEqual(expectedChordSheet);
  });

  it('omits the lyrics line when it is empty', () => {
    const formatter = new TextFormatter();

    const expectedChordSheet = heredoc`
Intro:  C
       Am         C/G        F          C
Let it be, let it be, let it be, let it be`;

    expect(formatter.format(songWithIntro)).toEqual(expectedChordSheet);
  });

  it('applies the correct normalization when a capo is active', () => {
    const songWithCapo = createSongFromAst([
      [tag('key', 'F')],
      [tag('capo', '1')],
      [
        chordLyricsPair('', 'My '),
        chordLyricsPair('Dm7', 'heart has always '),
        chordLyricsPair('C/E', 'longed for something '),
        chordLyricsPair('F', 'more'),
      ],
    ]);

    const expectedChordSheet = heredoc`
         C#m7             B/D#                 E
      My heart has always longed for something more`;

    expect(new TextFormatter().format(songWithCapo)).toEqual(expectedChordSheet);
  });

  it('can render in a different key', () => {
    const expectedChordSheet = heredoc`
      LET IT BE
      ChordSheetJS example version
      
      Written by: John Lennon,Paul McCartney
      
      Verse 1
             Cm         Eb/Bb      Ab         Eb
      Let it be, let it be, let it be, let it be
      F                Bb C           Bb F/A Gm F
      Whisper words of wisdom, let it be
      
      Breakdown
      Gm               Ab             Eb Bb
      Whisper words of wisdom, let it be
      
      Bridge 1
      Bridge line
      
      Grid 1
      Grid line
      
      Tab 1
      Tab line`;

    expect(new TextFormatter({ key: 'Eb' }).format(exampleSongSymbol)).toEqual(expectedChordSheet);
  });

  it('renders unicode modifiers with option useUnicodeModifiers:true', () => {
    const songWithCapo = createSongFromAst([
      [
        chordLyricsPair('', 'The '),
        chordLyricsPair('C#', 'chords are in a '),
        chordLyricsPair('Eb', 'broken key where '),
        chordLyricsPair('F#', 'sharps and '),
        chordLyricsPair('Ab', 'flats are mixed'),
      ],
    ]);

    const expectedChordSheet = heredoc`
          C♯              E♭               F♯         A♭
      The chords are in a broken key where sharps and flats are mixed`;

    expect(new TextFormatter({ useUnicodeModifiers: true }).format(songWithCapo)).toEqual(expectedChordSheet);
  });

  it('can skip chord normalization', () => {
    const songWithSus2 = createSongFromAst([
      [chordLyricsPair('Asus2', 'Let it be')],
    ]);

    const formatted = new TextFormatter({ normalizeChords: false }).format(songWithSus2);
    expect(formatted).toEqual('Asus2\nLet it be');
  });
});
