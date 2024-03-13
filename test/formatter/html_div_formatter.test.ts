import { HtmlDivFormatter } from '../../src';
import '../matchers';
import { exampleSongSolfege, exampleSongSymbol } from '../fixtures/song';
import { scopedCss } from '../../src/formatter/html_div_formatter';
import { stripHTML } from '../../src/template_helpers';
import ChordSheetSerializer from '../../src/chord_sheet_serializer';

import { chordLyricsPair, createSongFromAst, heredoc } from '../utilities';

describe('HtmlDivFormatter', () => {
  it('formats a symbol song to a html chord sheet correctly', () => {
    const expectedChordSheet = stripHTML(`
      <h1>Let it be</h1>
      <h2>ChordSheetJS example version</h2>
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Written by: </div>
            </div>
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">John Lennon,Paul McCartney</div>
            </div>
          </div>
        </div>
        <div class="paragraph verse">
          <div class="row">
            <h3 class="label">Verse 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Let it </div>
            </div>
            <div class="column">
              <div class="chord">Am</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">C/G</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">F</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">C</div>
              <div class="lyrics">be</div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">D</div>
              <div class="lyrics">Whisper </div>
            </div>
            <div class="column">
              <div class="annotation">strong</div>
              <div class="lyrics">words of </div>
            </div>
            <div class="column">
              <div class="chord">G</div>
              <div class="lyrics">wis</div>
            </div>
            <div class="column">
              <div class="chord">A</div>
              <div class="lyrics">dom, let it </div>
            </div>
            <div class="column">
              <div class="chord">G</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">D/F#</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Em</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">D</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        <div class="paragraph chorus">
          <div class="row">
            <div class="comment">Breakdown</div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Em</div>
              <div class="lyrics">Whisper words of </div>
            </div>
            <div class="column">
              <div class="chord">F</div>
              <div class="lyrics">wisdom, let it </div>
            </div>
            <div class="column">
              <div class="chord">C</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">G</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        
        <div class="paragraph bridge">
          <div class="row">
            <h3 class="label">Bridge 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Bridge line</div>
            </div>
          </div>
        </div>
        
        <div class="paragraph grid">
          <div class="row">
            <h3 class="label">Grid 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Grid line</div>
            </div>
          </div>
        </div>
        
        <div class="paragraph tab">
          <div class="row">
            <h3 class="label">Tab 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Tab line</div>
            </div>
          </div>
        </div>
      </div>
    `);

    expect(new HtmlDivFormatter().format(exampleSongSymbol)).toEqual(expectedChordSheet);
  });

  it('formats a solfege song to a html chord sheet correctly', () => {
    const expectedChordSheet = stripHTML(`
      <h1>Let it be</h1>
      <h2>ChordSheetJS example version</h2>
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Written by: </div>
            </div>
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">John Lennon,Paul McCartney</div>
            </div>
          </div>
        </div>
        <div class="paragraph verse">
          <div class="row">
            <h3 class="label">Verse 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Let it </div>
            </div>
            <div class="column">
              <div class="chord">Lam</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Do/Sol</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Fa</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Do</div>
              <div class="lyrics">be</div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Re</div>
              <div class="lyrics">Whisper </div>
            </div>
            <div class="column">
              <div class="annotation">strong</div>
              <div class="lyrics">words of </div>
            </div>
            <div class="column">
              <div class="chord">Sol</div>
              <div class="lyrics">wis</div>
            </div>
            <div class="column">
              <div class="chord">La</div>
              <div class="lyrics">dom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Sol</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">Re/Fa#</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Mim</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Re</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        <div class="paragraph chorus">
          <div class="row">
            <div class="comment">Breakdown</div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Mim</div>
              <div class="lyrics">Whisper words of </div>
            </div>
            <div class="column">
              <div class="chord">Fa</div>
              <div class="lyrics">wisdom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Do</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">Sol</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        
        <div class="paragraph bridge">
          <div class="row">
            <h3 class="label">Bridge 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Bridge line</div>
            </div>
          </div>
        </div>
        
        <div class="paragraph grid">
          <div class="row">
            <h3 class="label">Grid 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Grid line</div>
            </div>
          </div>
        </div>
        
        <div class="paragraph tab">
          <div class="row">
            <h3 class="label">Tab 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Tab line</div>
            </div>
          </div>
        </div>
      </div>
    `);

    expect(new HtmlDivFormatter().format(exampleSongSolfege)).toEqual(expectedChordSheet);
  });

  describe('with option renderBlankLines:false', () => {
    it('does not include HTML for blank lines', () => {
      const songWithBlankLine = createSongFromAst([
        [
          chordLyricsPair('C', 'Whisper words of wisdom'),
        ],

        [],

        [
          chordLyricsPair('Am', 'Whisper words of wisdom'),
        ],
      ]);

      const expectedChordSheet = stripHTML(`
        <div class="chord-sheet">
          <div class="paragraph">
            <div class="row">
              <div class="column">
                <div class="chord">C</div>
                <div class="lyrics">Whisper words of wisdom</div>
              </div>
            </div>
          </div>
          <div class="paragraph">
            <div class="row">
              <div class="column">
                <div class="chord">Am</div>
                <div class="lyrics">Whisper words of wisdom</div>
              </div>
            </div>
          </div>
        </div>
      `);

      const formatter = new HtmlDivFormatter({ renderBlankLines: false });

      expect(formatter.format(songWithBlankLine)).toEqual(expectedChordSheet);
    });
  });

  it('generates a CSS string', () => {
    const expectedCss = heredoc`
      .chord:not(:last-child) {
        padding-right: 10px;
      }
      
      .paragraph {
        margin-bottom: 1em;
      }
      
      .row {
        display: flex;
      }
      
      .chord:after {
        content: '\\200b';
      }
      
      .lyrics:after {
        content: '\\200b';
      }`;

    const actualCss = new HtmlDivFormatter().cssString();
    expect(actualCss).toEqual(expectedCss);
  });

  it('generates a scoped CSS string with the instance method', () => {
    const expectedCss = heredoc`
      .someScope .chord:not(:last-child) {
        padding-right: 10px;
      }
      
      .someScope .paragraph {
        margin-bottom: 1em;
      }
      
      .someScope .row {
        display: flex;
      }
      
      .someScope .chord:after {
        content: '\\200b';
      }
      
      .someScope .lyrics:after {
        content: '\\200b';
      }`;

    const actualCss = new HtmlDivFormatter().cssString('.someScope');
    expect(actualCss).toEqual(expectedCss);
  });

  it('generates a scoped CSS string with the exposed function', () => {
    const expectedCss = heredoc`
      .someScope .chord:not(:last-child) {
        padding-right: 10px;
      }
      
      .someScope .paragraph {
        margin-bottom: 1em;
      }
      
      .someScope .row {
        display: flex;
      }
      
      .someScope .chord:after {
        content: '\\200b';
      }
      
      .someScope .lyrics:after {
        content: '\\200b';
      }`;

    const actualCss = scopedCss('.someScope');
    expect(actualCss).toEqual(expectedCss);
  });

  it('generates a CSS object', () => {
    const { cssObject } = new HtmlDivFormatter();
    expect(typeof cssObject).toEqual('object');
  });

  it('applies the correct normalization when a capo is active', () => {
    const songWithCapo = new ChordSheetSerializer().deserialize({
      type: 'chordSheet',
      lines: [
        {
          type: 'line',
          items: [{ type: 'tag', name: 'key', value: 'F' }],
        },
        {
          type: 'line',
          items: [{ type: 'tag', name: 'capo', value: '1' }],
        },
        {
          type: 'line',
          items: [
            { type: 'chordLyricsPair', chords: '', lyrics: 'My ' },
            { type: 'chordLyricsPair', chords: 'Dm7', lyrics: 'heart has always ' },
            { type: 'chordLyricsPair', chords: 'C/E', lyrics: 'longed for something ' },
            { type: 'chordLyricsPair', chords: 'F', lyrics: 'more' },
          ],
        },
      ],
    });

    const expectedChordSheet = stripHTML(`
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">My </div>
            </div>
            <div class="column">
              <div class="chord">C#m7</div>
              <div class="lyrics">heart has always </div>
            </div>
            <div class="column">
              <div class="chord">B/D#</div>
              <div class="lyrics">longed for something </div>
            </div>
            <div class="column">
              <div class="chord">E</div>
              <div class="lyrics">more</div>
            </div>
          </div>
        </div>
      </div>
    `);

    expect(new HtmlDivFormatter().format(songWithCapo)).toEqual(expectedChordSheet);
  });

  it('can render in a different key (symbol chords)', () => {
    const expectedChordSheet = stripHTML(`
      <h1>Let it be</h1>
      <h2>ChordSheetJS example version</h2>
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Written by: </div>
            </div>
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">John Lennon,Paul McCartney</div>
            </div>
          </div>
        </div>
        <div class="paragraph verse">
          <div class="row">
            <h3 class="label">Verse 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Let it </div>
            </div>
            <div class="column">
              <div class="chord">Cm</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Eb/Bb</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Ab</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Eb</div>
              <div class="lyrics">be</div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">F</div>
              <div class="lyrics">Whisper </div>
            </div>
            <div class="column">
              <div class="annotation">strong</div>
              <div class="lyrics">words of </div>
            </div>
            <div class="column">
              <div class="chord">Bb</div>
              <div class="lyrics">wis</div>
            </div>
            <div class="column">
              <div class="chord">C</div>
              <div class="lyrics">dom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Bb</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">F/A</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Gm</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">F</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        <div class="paragraph chorus">
          <div class="row">
            <div class="comment">Breakdown</div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Gm</div>
              <div class="lyrics">Whisper words of </div>
            </div>
            <div class="column">
              <div class="chord">Ab</div>
              <div class="lyrics">wisdom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Eb</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">Bb</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        
        <div class="paragraph bridge">
          <div class="row">
            <h3 class="label">Bridge 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Bridge line</div>
            </div>
          </div>
        </div>
        <div class="paragraph grid">
          <div class="row">
            <h3 class="label">Grid 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Grid line</div>
            </div>
          </div>
        </div>
        <div class="paragraph tab">
          <div class="row">
            <h3 class="label">Tab 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Tab line</div>
            </div>
          </div>
        </div>
      </div>
    `);

    expect(new HtmlDivFormatter({ key: 'Eb' }).format(exampleSongSymbol)).toEqual(expectedChordSheet);
  });

  it('can render in a different key (solfege chords)', () => {
    const expectedChordSheet = stripHTML(`
      <h1>Let it be</h1>
      <h2>ChordSheetJS example version</h2>
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Written by: </div>
            </div>
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">John Lennon,Paul McCartney</div>
            </div>
          </div>
        </div>
        <div class="paragraph verse">
          <div class="row">
            <h3 class="label">Verse 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Let it </div>
            </div>
            <div class="column">
              <div class="chord">Dom</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Mib/Sib</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Lab</div>
              <div class="lyrics">be, let it </div>
            </div>
            <div class="column">
              <div class="chord">Mib</div>
              <div class="lyrics">be</div>
            </div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Fa</div>
              <div class="lyrics">Whisper </div>
            </div>
            
            <div class="column">
              <div class="annotation">strong</div>
              <div class="lyrics">words of </div>
            </div>
            <div class="column">
              <div class="chord">Sib</div>
              <div class="lyrics">wis</div>
            </div>
            <div class="column">
              <div class="chord">Do</div>
              <div class="lyrics">dom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Sib</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">Fa/La</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Solm</div>
              <div class="lyrics"> </div>
            </div>
            <div class="column">
              <div class="chord">Fa</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        <div class="paragraph chorus">
          <div class="row">
            <div class="comment">Breakdown</div>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord">Solm</div>
              <div class="lyrics">Whisper words of </div>
            </div>
            <div class="column">
              <div class="chord">Lab</div>
              <div class="lyrics">wisdom, let it </div>
            </div>
            <div class="column">
              <div class="chord">Mib</div>
              <div class="lyrics">be </div>
            </div>
            <div class="column">
              <div class="chord">Sib</div>
              <div class="lyrics"></div>
            </div>
          </div>
        </div>
        
        <div class="paragraph bridge">
          <div class="row">
            <h3 class="label">Bridge 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Bridge line</div>
            </div>
          </div>
        </div>
        <div class="paragraph grid">
          <div class="row">
            <h3 class="label">Grid 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Grid line</div>
            </div>
          </div>
        </div>
        <div class="paragraph tab">
          <div class="row">
            <h3 class="label">Tab 1</h3>
          </div>
          <div class="row">
            <div class="column">
              <div class="chord"></div>
              <div class="lyrics">Tab line</div>
            </div>
          </div>
        </div>
      </div>
    `);

    expect(new HtmlDivFormatter({ key: 'Mib' }).format(exampleSongSolfege)).toEqual(expectedChordSheet);
  });

  describe('with option useUnicodeModifiers:true', () => {
    it('replaces b with unicode flat', () => {
      const songWithFlats = createSongFromAst([
        [
          chordLyricsPair('Gb', 'Whisper words of wisdom'),
        ],

        [],

        [
          chordLyricsPair('Ebm', 'Whisper words of wisdom'),
        ],
      ]);

      const expectedChordSheet = stripHTML(`
        <div class="chord-sheet">
          <div class="paragraph">
            <div class="row">
              <div class="column">
                <div class="chord">G♭</div>
                <div class="lyrics">Whisper words of wisdom</div>
              </div>
            </div>
          </div>
          <div class="paragraph">
            <div class="row">
              <div class="column">
                <div class="chord">E♭m</div>
                <div class="lyrics">Whisper words of wisdom</div>
              </div>
            </div>
          </div>
        </div>
      `);

      const formatter = new HtmlDivFormatter({ renderBlankLines: false, useUnicodeModifiers: true });

      expect(formatter.format(songWithFlats)).toEqual(expectedChordSheet);
    });
  });

  it('can skip chord normalization', () => {
    const songWithSus2 = createSongFromAst([
      [chordLyricsPair('Asus2', 'Let it be')],
    ]);

    const expectedHTML = stripHTML(`
      <div class="chord-sheet">
        <div class="paragraph">
          <div class="row">
            <div class="column">
              <div class="chord">Asus2</div>
              <div class="lyrics">Let it be</div>
            </div>
          </div>
        </div>
      </div>
    `);

    const formatted = new HtmlDivFormatter({ normalizeChords: false }).format(songWithSus2);

    expect(formatted).toEqual(expectedHTML);
  });
});
