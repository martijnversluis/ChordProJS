import { Chord } from '../../src';
import '../matchers';

describe('Chord', () => {
  describe('numeral', () => {
    describe('toNumeral', () => {
      it('returns a clone of the chord', () => {
        const originalChord = Chord.parse('#iiisus4/bV');
        const numeralChord = originalChord?.toNumeral();
        expect(numeralChord).toEqual(originalChord);
        expect(numeralChord).not.toBe(originalChord);
      });
    });
  });
});
