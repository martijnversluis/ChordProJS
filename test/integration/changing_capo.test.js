import { ChordProFormatter, ChordProParser } from '../../src';

describe('changing the capo of an existing song', () => {
  it('updates the capo directive', () => {
    const chordpro = `
{capo: 7}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const changedSheet = `
{capo: 3}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const song = new ChordProParser().parse(chordpro);
    const updatedSong = song.setCapo(3);

    expect(new ChordProFormatter().format(updatedSong)).toEqual(changedSheet);
  });

  it('adds the capo directive', () => {
    const chordpro = `
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const changedSheet = `
{capo: 3}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const song = new ChordProParser().parse(chordpro);
    const updatedSong = song.setCapo(3);

    expect(new ChordProFormatter().format(updatedSong)).toEqual(changedSheet);
  });

  it('adds the capo directive after the key directive', () => {
    const chordpro = `
{key: C}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const changedSheet = `
{key: C}
{capo: 3}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const song = new ChordProParser().parse(chordpro);
    const updatedSong = song.setCapo(3);

    expect(new ChordProFormatter().format(updatedSong)).toEqual(changedSheet);
  });

  it('removes the capo directive', () => {
    const chordpro = `
{key: C}
{capo: 3}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const changedSheet = `
{key: C}
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be`.substring(1);

    const song = new ChordProParser().parse(chordpro);
    const updatedSong = song.setCapo(null);

    expect(new ChordProFormatter().format(updatedSong)).toEqual(changedSheet);
  });
});
