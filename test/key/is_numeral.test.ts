import { NUMERIC, SYMBOL } from '../../src';
import { buildKey } from '../utilities';
import { NUMERAL } from '../../src/constants';

describe('Key', () => {
  describe('isNumeral', () => {
    describe('for a symbol key', () => {
      it('returns false', () => {
        const key = buildKey('A', SYMBOL, '#');

        expect(key.isNumeral()).toBe(false);
      });
    });

    describe('for a numeric key', () => {
      it('returns false', () => {
        const key = buildKey(5, NUMERIC, '#');

        expect(key.isNumeral()).toBe(false);
      });
    });

    describe('for a numeral', () => {
      it('returns true', () => {
        const key = buildKey('V', NUMERAL, '#');

        expect(key.isNumeral()).toBe(true);
      });
    });
  });
});
