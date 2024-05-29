/* eslint indent: 0 */

import fs from 'fs';

import SCALES from '../data/scales';

import {
  FLAT,
  MAJOR,
  MINOR,
  NO_MODIFIER,
  NUMERAL,
  NUMERIC,
  SHARP,
  SYMBOL,
  SOLFEGE,
} from '../src/constants';

const MODIFIERS = { NO_MODIFIER, SHARP, FLAT };
const MODES = { MAJOR, MINOR };

const KEY_TYPES = {
  SYMBOL,
  SOLFEGE,
  NUMERIC,
  NUMERAL,
};

const keyToGradeMapping = `
  /*
  ⚠️⚠️⚠️ NOTE: this file has been generated automatically.
          Please do NOT edit this file directly, but instead:
            - edit the data source, located in \`data/scales.ts\`
            - run \`yarn build:code-generate\` to re-generate this file.
   */
   
  import {
    ChordType, 
    Mode,
    ModifierMaybe, 
    FLAT, 
    MAJOR,
    MINOR,
    NO_MODIFIER, 
    NUMERAL, 
    NUMERIC, 
    SHARP, 
    SYMBOL,
    SOLFEGE
  } from './constants';

  export const KEY_TO_GRADE: Record<ChordType, Record<Mode, Record<ModifierMaybe, Record<string, number>>>> = {
    ${
  Object.entries(KEY_TYPES).map(([keyTypeName, keyTypeValue]) => `
        [${keyTypeName}]: {
          ${
  Object.entries(MODES).map(([modeName, modeValue]) => `
              [${modeName}]: {
                ${
  Object.entries(MODIFIERS).map(([modifierName, modifierValue]) => `
                    [${modifierName}]: {
                      ${
  SCALES[keyTypeValue][modeValue][modifierValue].map((keyString, grade) => {
    if (keyString === null) {
      return null;
    }

    const keyWithoutModifier = keyString.replace(/#|b/g, '');
    return `${keyWithoutModifier}: ${grade}`;
  }).filter((v) => v).join(',\n')
}
                    },
                  `).join('\n')
}
              },
            `).join('\n')
}
        },
      `).join('\n')
}
  };
  
  export const GRADE_TO_KEY: Record<ChordType, Record<Mode, Record<ModifierMaybe, Record<number, string>>>> = {
    ${
  Object.entries(KEY_TYPES).map(([keyTypeName, keyTypeValue]) => `
        [${keyTypeName}]: {
          ${
  Object.entries(MODES).map(([modeName, modeValue]) => `
              [${modeName}]: {
                ${
  Object.entries(MODIFIERS).map(([modifierName, modifierValue]) => `
                    [${modifierName}]: {
                      ${
  SCALES[keyTypeValue][modeValue][modifierValue].map((keyString, grade) => {
    if (keyString === null) {
      return null;
    }

    return `${grade}: '${keyString}',`;
  }).filter((v) => v).join('\n')
}
                    },
                  `).join('\n')
}
              },
            `).join('\n')
}
        },
      `).join('\n')
}
  };
`;

fs.writeFileSync('src/scales.ts', keyToGradeMapping);
