import '../matchers';

import { ChordsOverWordsParser } from '../../src';
import { heredoc } from '../utilities';

describe('ChordsOverWordsParser', () => {
  it('parses chords over words correctly', () => {
    const chordOverWords = heredoc`
      title: Let it be
      key: C
      ---
      Chorus 1:
             Am         C/G        F          C
      Let it be, let it be, let it be, let it be
      C                G              F  C/E Dm C
      Whisper words of wisdom, let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines.length).toEqual(5);

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('key', 'C');

    expect(lines[2].items.length).toEqual(1);
    expect(lines[2].items[0]).toBeTag('comment', 'Chorus 1:');

    const line3Pairs = lines[3].items;
    expect(line3Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line3Pairs[1]).toBeChordLyricsPair('Am', 'be, ');
    expect(line3Pairs[2]).toBeChordLyricsPair('', 'let it ');
    expect(line3Pairs[3]).toBeChordLyricsPair('C/G', 'be, ');
    expect(line3Pairs[4]).toBeChordLyricsPair('', 'let it ');
    expect(line3Pairs[5]).toBeChordLyricsPair('F', 'be, ');
    expect(line3Pairs[6]).toBeChordLyricsPair('', 'let it ');
    expect(line3Pairs[7]).toBeChordLyricsPair('C', 'be');

    const line4Pairs = lines[4].items;
    expect(line4Pairs[0]).toBeChordLyricsPair('C', 'Whisper ');
    expect(line4Pairs[1]).toBeChordLyricsPair('', 'words of ');
    expect(line4Pairs[2]).toBeChordLyricsPair('G', 'wisdom, ');
    expect(line4Pairs[3]).toBeChordLyricsPair('', 'let it ');
    expect(line4Pairs[4]).toBeChordLyricsPair('F', 'be');
    expect(line4Pairs[5]).toBeChordLyricsPair('C/E', '');
    expect(line4Pairs[6]).toBeChordLyricsPair('Dm', '');
    expect(line4Pairs[7]).toBeChordLyricsPair('C', '');
  });

  it('allows for frontmatter separator to be optional', () => {
    const chordOverWords = heredoc`
      title: Let it be
      key: C
      
      Chorus 1:
             Am         C/G        F          C
      Let it be, let it be, let it be, let it be
      C                G              F  C/E Dm C
      Whisper words of wisdom, let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    // expect(lines.length).toEqual(5);

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('key', 'C');

    expect(lines[2].items.length).toEqual(0);

    expect(lines[3].items.length).toEqual(1);
    expect(lines[3].items[0]).toBeTag('comment', 'Chorus 1:');

    const line4Pairs = lines[4].items;
    expect(line4Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line4Pairs[1]).toBeChordLyricsPair('Am', 'be, ');
    expect(line4Pairs[2]).toBeChordLyricsPair('', 'let it ');
    expect(line4Pairs[3]).toBeChordLyricsPair('C/G', 'be, ');
    expect(line4Pairs[4]).toBeChordLyricsPair('', 'let it ');
    expect(line4Pairs[5]).toBeChordLyricsPair('F', 'be, ');
    expect(line4Pairs[6]).toBeChordLyricsPair('', 'let it ');
    expect(line4Pairs[7]).toBeChordLyricsPair('C', 'be');

    const lines5Pairs = lines[5].items;
    expect(lines5Pairs[0]).toBeChordLyricsPair('C', 'Whisper ');
    expect(lines5Pairs[1]).toBeChordLyricsPair('', 'words of ');
    expect(lines5Pairs[2]).toBeChordLyricsPair('G', 'wisdom, ');
    expect(lines5Pairs[3]).toBeChordLyricsPair('', 'let it ');
    expect(lines5Pairs[4]).toBeChordLyricsPair('F', 'be');
    expect(lines5Pairs[5]).toBeChordLyricsPair('C/E', '');
    expect(lines5Pairs[6]).toBeChordLyricsPair('Dm', '');
    expect(lines5Pairs[7]).toBeChordLyricsPair('C', '');
  });

  it('parses simple chords over words with only 1 metadata', () => {
    const chordOverWords = heredoc`
      title: Let it be
      Chorus 1:
             Am
      Let it be`;
    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('comment', 'Chorus 1:');

    const line1Pairs = lines[2].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line1Pairs[1]).toBeChordLyricsPair('Am', 'be');
  });

  it('correctly differentiates between lyric only lines and comments', () => {
    const chordOverWords = heredoc`
      Chorus 1:
             Am
      Let it be
      Whisper words of wisdom, let it be
      
      Verse
      When I find myself in times of trouble
      Mother Mary comes to me`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('comment', 'Chorus 1:');

    const line1Pairs = lines[1].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line1Pairs[1]).toBeChordLyricsPair('Am', 'be');

    expect(lines[2].items[0]).toBeChordLyricsPair('', 'Whisper words of wisdom, let it be');

    expect(lines[3].items.length).toEqual(0);

    expect(lines[4].items.length).toEqual(1);
    expect(lines[4].items[0]).toBeTag('comment', 'Verse');

    expect((lines[5].items)[0]).toBeChordLyricsPair('', 'When I find myself in times of trouble');
    expect((lines[6].items)[0]).toBeChordLyricsPair('', 'Mother Mary comes to me');
  });

  it('supports a chords only section with rhythm symbols ', () => {
    const chordOverWords = heredoc`
      title: Rattle
      Intro (5x)
      Eb(no3) / / / | / / / / |`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Rattle');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('comment', 'Intro (5x)');

    const line2Pairs = lines[2].items;
    expect(line2Pairs[0]).toBeChordLyricsPair('Eb(no3)', '');
    expect(line2Pairs[1]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[2]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[3]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[4]).toBeChordLyricsPair('|', '');
    expect(line2Pairs[5]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[6]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[7]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[8]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[9]).toBeChordLyricsPair('|', '');
  });

  it('supports two chords only sections with rhythm symbols and chords above eachother', () => {
    const chordOverWords = heredoc`
      Interlude 4 *18
      Dm9 / C/E / | F9/A Bbmaj9 / A7(#9#5) |
      Dm9 / C/E /D - /Db - /C | F13 Bbmaj9 / A7(#9#5) |`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('comment', 'Interlude 4 *18');

    const line1Pairs = lines[1].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('Dm9', '');
    expect(line1Pairs[1]).toBeChordLyricsPair('/', '');
    expect(line1Pairs[2]).toBeChordLyricsPair('C/E', '');
    expect(line1Pairs[3]).toBeChordLyricsPair('/', '');
    expect(line1Pairs[4]).toBeChordLyricsPair('|', '');
    expect(line1Pairs[5]).toBeChordLyricsPair('F9/A', '');
    expect(line1Pairs[6]).toBeChordLyricsPair('Bbmaj9', '');
    expect(line1Pairs[7]).toBeChordLyricsPair('/', '');
    expect(line1Pairs[8]).toBeChordLyricsPair('A7(#9#5)', '');
    expect(line1Pairs[9]).toBeChordLyricsPair('|', '');

    const line2Pairs = lines[2].items;
    expect(line2Pairs[0]).toBeChordLyricsPair('Dm9', '');
    expect(line2Pairs[1]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[2]).toBeChordLyricsPair('C/E', '');
    expect(line2Pairs[3]).toBeChordLyricsPair('/D', '');
    expect(line2Pairs[4]).toBeChordLyricsPair('-', '');
    expect(line2Pairs[5]).toBeChordLyricsPair('/Db', '');
    expect(line2Pairs[6]).toBeChordLyricsPair('-', '');
    expect(line2Pairs[7]).toBeChordLyricsPair('/C', '');
    expect(line2Pairs[8]).toBeChordLyricsPair('|', '');
    expect(line2Pairs[9]).toBeChordLyricsPair('F13', '');
    expect(line2Pairs[10]).toBeChordLyricsPair('Bbmaj9', '');
    expect(line2Pairs[11]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[12]).toBeChordLyricsPair('A7(#9#5)', '');
    expect(line2Pairs[13]).toBeChordLyricsPair('|', '');
  });

  it('supports mixed chords only line & chords over words ', () => {
    const chordOverWords = heredoc`
      title: Rattle
      Intro (5x)
      Eb(no3) / / / | / / / / |
      
      Verse 1
      Eb                   Ebsus         Eb      
      Saturday was silent, surely it was through
      Ab2 - Eb/G Eb /`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Rattle');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('comment', 'Intro (5x)');

    const line2Pairs = lines[2].items;
    expect(line2Pairs[0]).toBeChordLyricsPair('Eb(no3)', '');
    expect(line2Pairs[1]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[2]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[3]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[4]).toBeChordLyricsPair('|', '');
    expect(line2Pairs[5]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[6]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[7]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[8]).toBeChordLyricsPair('/', '');
    expect(line2Pairs[9]).toBeChordLyricsPair('|', '');

    expect(lines[3].items.length).toEqual(0);

    expect(lines[4].items.length).toEqual(1);
    expect(lines[4].items[0]).toBeTag('comment', 'Verse 1');

    const line5Pairs = lines[5].items;
    expect(line5Pairs[0]).toBeChordLyricsPair('Eb', 'Saturday ');
    expect(line5Pairs[1]).toBeChordLyricsPair('', 'was silent, ');
    expect(line5Pairs[2]).toBeChordLyricsPair('Ebsus', 'surely ');
    expect(line5Pairs[3]).toBeChordLyricsPair('', 'it was ');
    expect(line5Pairs[4]).toBeChordLyricsPair('Eb', 'through');

    const line6Pairs = lines[6].items;
    expect(line6Pairs[0]).toBeChordLyricsPair('Ab2', '');
    expect(line6Pairs[1]).toBeChordLyricsPair('-', '');
    expect(line6Pairs[2]).toBeChordLyricsPair('Eb/G', '');
    expect(line6Pairs[3]).toBeChordLyricsPair('Eb', '');
    expect(line6Pairs[4]).toBeChordLyricsPair('/', '');
  });

  it('parses comment without a ":"', () => {
    const chordOverWords = heredoc`
      title: Let it be
      Chorus 1
             Am
      Let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('comment', 'Chorus 1');

    const line1Pairs = lines[2].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line1Pairs[1]).toBeChordLyricsPair('Am', 'be');
  });

  it('parses simple chords over words with no metadata', () => {
    const chordOverWords = heredoc`
      Chorus 1:
             Am
      Let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('comment', 'Chorus 1:');

    const line1Pairs = lines[1].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line1Pairs[1]).toBeChordLyricsPair('Am', 'be');
  });

  it('supports transpose & new_key directive', () => {
    const chordOverWords = heredoc`
      title: Let it be
      key: C
      Chorus 1:
             Am
      Let it be
      nk: G
             Em
      Let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('key', 'C');

    expect(lines[2].items.length).toEqual(1);
    expect(lines[2].items[0]).toBeTag('comment', 'Chorus 1:');

    const line3Pairs = lines[3].items;
    expect(line3Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line3Pairs[1]).toBeChordLyricsPair('Am', 'be');

    expect(lines[4].items.length).toEqual(1);
    expect(lines[4].items[0]).toBeTag('new_key', 'G');

    const line5Pairs = lines[5].items;
    expect(line5Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line5Pairs[1]).toBeChordLyricsPair('Em', 'be');
  });

  it('supports traditional metadata with brackets', () => {
    const chordOverWords = heredoc`
      {title: Let it be}
      {key: C}
      Chorus 1:
             Am
      Let it be
      {nk: G}
             Em
      Let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('key', 'C');

    expect(lines[2].items.length).toEqual(1);
    expect(lines[2].items[0]).toBeTag('comment', 'Chorus 1:');

    const line4Pairs = lines[3].items;
    expect(line4Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line4Pairs[1]).toBeChordLyricsPair('Am', 'be');
  });

  it('new line is not required at the end', () => {
    const chordOverWords = heredoc`
      title: Let it be
      Chorus 1:
             Am
      Let it be`;

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordOverWords);
    const { lines } = song;

    expect(lines[0].items.length).toEqual(1);
    expect(lines[0].items[0]).toBeTag('title', 'Let it be');

    expect(lines[1].items.length).toEqual(1);
    expect(lines[1].items[0]).toBeTag('comment', 'Chorus 1:');

    const line1Pairs = lines[2].items;
    expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line1Pairs[1]).toBeChordLyricsPair('Am', 'be');
  });

  describe('chord placement', () => {
    it('pairs chord with only one lyric', () => {
      const chordOverWords = heredoc`
        Chorus 1:
               Am         C/G
        Let it be, let it be`;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords);
      const { lines } = song;

      expect(lines[0].items.length).toEqual(1);
      expect(lines[0].items[0]).toBeTag('comment', 'Chorus 1:');

      const line2Pairs = lines[1].items;
      expect(line2Pairs[0]).toBeChordLyricsPair('', 'Let it ');
      expect(line2Pairs[1]).toBeChordLyricsPair('Am', 'be, ');
      expect(line2Pairs[2]).toBeChordLyricsPair('', 'let it ');
      expect(line2Pairs[3]).toBeChordLyricsPair('C/G', 'be');
    });

    it('correctly places a trailing chord', () => {
      const chordOverWords = heredoc`
        Chorus 1
              Am            C/G
        Let it   be, let it be`;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords);
      const { lines } = song;

      expect(lines[0].items.length).toEqual(1);
      expect(lines[0].items[0]).toBeTag('comment', 'Chorus 1');

      const line1Pairs = lines[1].items;
      expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it');
      expect(line1Pairs[1]).toBeChordLyricsPair('Am', ' ');
      expect(line1Pairs[2]).toBeChordLyricsPair('', 'be, let it ');
      expect(line1Pairs[3]).toBeChordLyricsPair('C/G', 'be');
    });

    it('correctly places a trailing chord when the trailing chord is pushed by the previous chord', () => {
      const chordOverWords = heredoc`
                 Dm/C          G13      G13(#5) Gm7/C     F
        We’ll be singing for - ever and ever,         a - men`;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords);
      const { lines } = song;

      const linePairs = lines[0].items;
      expect(linePairs[0]).toBeChordLyricsPair('', 'We’ll be ');
      expect(linePairs[1]).toBeChordLyricsPair('Dm/C', 'singing ');
      expect(linePairs[2]).toBeChordLyricsPair('', 'for - ');
      expect(linePairs[3]).toBeChordLyricsPair('G13', 'ever ');
      expect(linePairs[4]).toBeChordLyricsPair('', 'and ');
      expect(linePairs[5]).toBeChordLyricsPair('G13(#5)', 'ever, ');
      expect(linePairs[6]).toBeChordLyricsPair('Gm7/C', ' ');
      expect(linePairs[7]).toBeChordLyricsPair('', 'a - ');
      expect(linePairs[8]).toBeChordLyricsPair('F', 'men');
    });

    it('handles a complicated suffix', () => {
      const chordOverWords = heredoc`
        Chorus 1
              Am7(#9)            C/G
        Let it        be, let it be`;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords);
      const { lines } = song;

      expect(lines[0].items.length).toEqual(1);
      expect(lines[0].items[0]).toBeTag('comment', 'Chorus 1');

      const line1Pairs = lines[1].items;
      expect(line1Pairs[0]).toBeChordLyricsPair('', 'Let it');
      expect(line1Pairs[1]).toBeChordLyricsPair('Am7(#9)', ' ');
      expect(line1Pairs[2]).toBeChordLyricsPair('', 'be, let it ');
      expect(line1Pairs[3]).toBeChordLyricsPair('C/G', 'be');
    });

    it('handles a lyrics line that starts with a "I" which can be a numeral chord ', () => {
      const chordOverWords = heredoc`
        Verse 1
          Dm7                   Bb                F2
        I searched the stars to knock on Heaven's door`;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords);
      const { lines } = song;

      expect(lines[0].items.length).toEqual(1);
      expect(lines[0].items[0]).toBeTag('comment', 'Verse 1');

      const line1Pairs = lines[1].items;
      expect(line1Pairs[0]).toBeChordLyricsPair('', 'I ');
      expect(line1Pairs[1]).toBeChordLyricsPair('Dm7', 'searched ');
      expect(line1Pairs[2]).toBeChordLyricsPair('', 'the stars to ');
      expect(line1Pairs[3]).toBeChordLyricsPair('Bb', 'knock ');
      expect(line1Pairs[4]).toBeChordLyricsPair('', 'on Heaven\'s ');
      expect(line1Pairs[5]).toBeChordLyricsPair('F2', 'door');
    });
  });

  it('support CR line endings', () => {
    const chordSheet = '       Am         C/G\rLet it be, let it be,\r       F          C\rlet it be, let it be';

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordSheet);
    const { lines } = song;
    const [{ items: line0Items }, { items: line1Items }] = lines;

    expect(lines).toHaveLength(2);

    expect(line0Items[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line0Items[1]).toBeChordLyricsPair('Am', 'be, ');
    expect(line0Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line0Items[3]).toBeChordLyricsPair('C/G', 'be,');
    expect(line1Items[0]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[1]).toBeChordLyricsPair('F', 'be, ');
    expect(line1Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[3]).toBeChordLyricsPair('C', 'be');
  });

  it('support LF line endings', () => {
    const chordSheet = '       Am         C/G\nLet it be, let it be,\n       F          C\nlet it be, let it be';

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordSheet);
    const { lines } = song;
    const [{ items: line0Items }, { items: line1Items }] = lines;

    expect(lines).toHaveLength(2);

    expect(line0Items[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line0Items[1]).toBeChordLyricsPair('Am', 'be, ');
    expect(line0Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line0Items[3]).toBeChordLyricsPair('C/G', 'be,');
    expect(line1Items[0]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[1]).toBeChordLyricsPair('F', 'be, ');
    expect(line1Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[3]).toBeChordLyricsPair('C', 'be');
  });

  it('support CRLF line endings', () => {
    const chordSheet = '       Am         C/G\r\nLet it be, let it be,\r\n       F          C\r\nlet it be, let it be';

    const parser = new ChordsOverWordsParser();
    const song = parser.parse(chordSheet);
    const { lines } = song;
    const [{ items: line0Items }, { items: line1Items }] = lines;

    expect(lines).toHaveLength(2);

    expect(line0Items[0]).toBeChordLyricsPair('', 'Let it ');
    expect(line0Items[1]).toBeChordLyricsPair('Am', 'be, ');
    expect(line0Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line0Items[3]).toBeChordLyricsPair('C/G', 'be,');
    expect(line1Items[0]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[1]).toBeChordLyricsPair('F', 'be, ');
    expect(line1Items[2]).toBeChordLyricsPair('', 'let it ');
    expect(line1Items[3]).toBeChordLyricsPair('C', 'be');
  });

  describe('with option softLineBreaks=true', () => {
    it('parses soft line breaks', () => {
      const chordOverWords = heredoc`
               Am         C/G          F          C
        Let it be, let it be, let it \\ be, let it be
      `;

      const parser = new ChordsOverWordsParser();
      const song = parser.parse(chordOverWords, { softLineBreaks: true });
      const { lines } = song;

      const lineItems = lines[0].items;

      expect(lineItems[0]).toBeChordLyricsPair('', 'Let it ');
      expect(lineItems[1]).toBeChordLyricsPair('Am', 'be, ');
      expect(lineItems[2]).toBeChordLyricsPair('', 'let it ');
      expect(lineItems[3]).toBeChordLyricsPair('C/G', 'be, ');
      expect(lineItems[4]).toBeChordLyricsPair('', 'let it ');
      expect(lineItems[5]).toBeSoftLineBreak();
      expect(lineItems[6]).toBeChordLyricsPair('F', 'be, ');
      expect(lineItems[7]).toBeChordLyricsPair('', 'let it ');
      expect(lineItems[8]).toBeChordLyricsPair('C', 'be');
    });
  });
});
