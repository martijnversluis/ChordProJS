import ChordSheetJS, {
  Chord,
  ChordLyricsPair,
  ChordProFormatter,
  ChordProParser,
  ChordSheetParser,
  ChordSheetSerializer,
  ChordsOverWordsParser,
  Comment,
  Composite,
  Formatter,
  HtmlFormatter,
  HtmlDivFormatter,
  HtmlTableFormatter,
  Key,
  Line,
  Literal,
  Metadata,
  Paragraph,
  Song,
  Tag,
  Ternary,
  TextFormatter,
  UltimateGuitarParser,
  CHORUS,
  INDETERMINATE,
  NONE,
  NUMERIC,
  SYMBOL,
  TAB,
  VERSE,
  templateHelpers,
} from '../src';

const {
  isEvaluatable,
  isChordLyricsPair,
  lineHasContents,
  isTag,
  isComment,
  stripHTML,
  each,
  when,
  hasTextContents,
  lineClasses,
  paragraphClasses,
  evaluate,
  fontStyleTag,
} = templateHelpers;

describe('exports', () => {
  it('supplies all required constants as named exports', () => {
    expect(Chord).toBeDefined();
    expect(ChordLyricsPair).toBeDefined();
    expect(ChordProFormatter).toBeDefined();
    expect(ChordProParser).toBeDefined();
    expect(ChordSheetParser).toBeDefined();
    expect(ChordSheetSerializer).toBeDefined();
    expect(ChordsOverWordsParser).toBeDefined();
    expect(Comment).toBeDefined();
    expect(Composite).toBeDefined();
    expect(Formatter).toBeDefined();
    expect(HtmlFormatter).toBeDefined();
    expect(HtmlDivFormatter).toBeDefined();
    expect(HtmlTableFormatter).toBeDefined();
    expect(Key).toBeDefined();
    expect(Line).toBeDefined();
    expect(Literal).toBeDefined();
    expect(Metadata).toBeDefined();
    expect(Paragraph).toBeDefined();
    expect(Song).toBeDefined();
    expect(Tag).toBeDefined();
    expect(Ternary).toBeDefined();
    expect(TextFormatter).toBeDefined();
    expect(UltimateGuitarParser).toBeDefined();
    expect(CHORUS).toBeDefined();
    expect(INDETERMINATE).toBeDefined();
    expect(NONE).toBeDefined();
    expect(NUMERIC).toBeDefined();
    expect(SYMBOL).toBeDefined();
    expect(TAB).toBeDefined();
    expect(VERSE).toBeDefined();
    expect(templateHelpers).toBeDefined();
  });

  it('supplies all template helpers', () => {
    expect(isEvaluatable).toBeDefined();
    expect(isChordLyricsPair).toBeDefined();
    expect(lineHasContents).toBeDefined();
    expect(isTag).toBeDefined();
    expect(isComment).toBeDefined();
    expect(stripHTML).toBeDefined();
    expect(each).toBeDefined();
    expect(when).toBeDefined();
    expect(hasTextContents).toBeDefined();
    expect(lineClasses).toBeDefined();
    expect(paragraphClasses).toBeDefined();
    expect(evaluate).toBeDefined();
    expect(fontStyleTag).toBeDefined();
  });

  it('supplies all constants as properties of the default export', () => {
    expect(ChordSheetJS.ChordProParser).toBeDefined();
    expect(ChordSheetJS.ChordSheetParser).toBeDefined();
    expect(ChordSheetJS.ChordsOverWordsParser).toBeDefined();
    expect(ChordSheetJS.UltimateGuitarParser).toBeDefined();
    expect(ChordSheetJS.TextFormatter).toBeDefined();
    expect(ChordSheetJS.HtmlTableFormatter).toBeDefined();
    expect(ChordSheetJS.HtmlDivFormatter).toBeDefined();
    expect(ChordSheetJS.ChordProFormatter).toBeDefined();
    expect(ChordSheetJS.ChordLyricsPair).toBeDefined();
    expect(ChordSheetJS.Line).toBeDefined();
    expect(ChordSheetJS.Song).toBeDefined();
    expect(ChordSheetJS.Tag).toBeDefined();
    expect(ChordSheetJS.Comment).toBeDefined();
    expect(ChordSheetJS.Metadata).toBeDefined();
    expect(ChordSheetJS.Paragraph).toBeDefined();
    expect(ChordSheetJS.Ternary).toBeDefined();
    expect(ChordSheetJS.Composite).toBeDefined();
    expect(ChordSheetJS.Literal).toBeDefined();
    expect(ChordSheetJS.ChordSheetSerializer).toBeDefined();
    expect(ChordSheetJS.CHORUS).toBeDefined();
    expect(ChordSheetJS.INDETERMINATE).toBeDefined();
    expect(ChordSheetJS.NONE).toBeDefined();
    expect(ChordSheetJS.TAB).toBeDefined();
    expect(ChordSheetJS.VERSE).toBeDefined();
  });
});
