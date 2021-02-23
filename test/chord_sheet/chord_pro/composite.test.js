import Metadata from '../../../src/chord_sheet/metadata';
import Ternary from '../../../src/chord_sheet/chord_pro/ternary';
import Composite from '../../../src/chord_sheet/chord_pro/composite';
import Literal from '../../../src/chord_sheet/chord_pro/literal';

describe('Composite', () => {
  describe('#evaluate', () => {
    it('evaluates string expressions', () => {
      const literal = new Literal('Value present');
      const composite = new Composite([literal]);
      const metadata = new Metadata();

      expect(composite.evaluate(metadata)).toEqual('Value present');
    });

    it('evaluates ternaries', () => {
      const ternary = new Ternary({ variable: 'composer' });
      const composite = new Composite([ternary]);
      const metadata = new Metadata({ composer: 'John' });

      expect(composite.evaluate(metadata)).toEqual('John');
    });

    it('evaluates mixed expressions', () => {
      const ternary = new Ternary({ variable: 'composer' });
      const literal = new Literal('Composer: ');
      const composite = new Composite([literal, ternary]);
      const metadata = new Metadata({ composer: 'John' });

      expect(composite.evaluate(metadata)).toEqual('Composer: John');
    });
  });
});
