import { parse } from './chords_over_words_peg_parser';
import Song from '../chord_sheet/song';
import ParserWarning from './parser_warning';
import { ParseOptions } from './chord_pro_peg_parser';
import { normalizeLineEndings } from '../utilities';
import ChordSheetSerializer from '../chord_sheet_serializer';

/**
 * Parses a chords over words sheet into a song
 *
 * It support "regular" chord sheets:
 *
 *            Am         C/G        F          C
 *     Let it be, let it be, let it be, let it be
 *     C                G              F  C/E Dm C
 *     Whisper words of wisdom, let it be
 *
 * Additionally, some chordpro features have been "ported back". For example, you can use chordpro directives:
 *
 *     {title: Let it be}
 *     {key: C}
 *     Chorus 1:
 *            Am
 *     Let it be
 *
 * For convenience, you can leave out the brackets:
 *
 *     title: Let it be
 *     Chorus 1:
 *            Am
 *     Let it be
 *
 * You can even use a markdown style frontmatter separator to separate the header from the song:
 *
 *     title: Let it be
 *     key: C
 *     ---
 *     Chorus 1:
 *            Am         C/G        F          C
 *     Let it be, let it be, let it be, let it be
 *     C                G              F  C/E Dm C
 *     Whisper words of wisdom, let it be
 *
 * `ChordsOverWordsParser` is the better version of `ChordSheetParser`, which is deprecated.
 */
class ChordsOverWordsParser {
  song?: Song;

  /**
   * All warnings raised during parsing the chord sheet
   * @member
   * @type {ParserWarning[]}
   */
  get warnings(): ParserWarning[] {
    return this.song?.warnings || [];
  }

  /**
   * Parses a chords over words sheet into a song
   * @param {string} chordSheet the chords over words sheet
   * @param {ParseOptions} options Parser options.
   * @see https://peggyjs.org/documentation.html#using-the-parser
   * @returns {Song} The parsed song
   */
  parse(chordSheet: string, options?: ParseOptions): Song {
    const ast = parse(normalizeLineEndings(chordSheet), options);
    this.song = new ChordSheetSerializer().deserialize(ast);
    return this.song;
  }
}

export default ChordsOverWordsParser;
