
  /*
  ⚠️⚠️⚠️ NOTE: this file has been generated automatically.
          Please do NOT edit this file directly, but instead:
            - edit the data source, located in `data/scales.ts`
            - run `yarn build:code-generate` to re-generate this file.
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
    
        [SYMBOL]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      C: 0,
D: 2,
E: 4,
F: 5,
G: 7,
A: 9,
B: 11
                    },
                  

                    [SHARP]: {
                      B: 0,
C: 1,
D: 3,
E: 5,
F: 6,
G: 8,
A: 10
                    },
                  

                    [FLAT]: {
                      D: 1,
E: 3,
F: 4,
G: 6,
A: 8,
B: 10,
C: 11
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      C: 0,
D: 2,
E: 4,
F: 5,
G: 7,
A: 9,
B: 11
                    },
                  

                    [SHARP]: {
                      B: 0,
C: 1,
D: 3,
E: 5,
F: 6,
G: 8,
A: 10
                    },
                  

                    [FLAT]: {
                      D: 1,
E: 3,
F: 4,
G: 6,
A: 8,
B: 10,
C: 11
                    },
                  
              },
            
        },
      

        [SOLFEGE]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      Do: 0,
Re: 2,
Mi: 4,
Fa: 5,
Sol: 7,
La: 9,
Si: 11
                    },
                  

                    [SHARP]: {
                      Si: 0,
Do: 1,
Re: 3,
Mi: 5,
Fa: 6,
Sol: 8,
La: 10
                    },
                  

                    [FLAT]: {
                      Re: 1,
Mi: 3,
Fa: 4,
Sol: 6,
La: 8,
Si: 10,
Do: 11
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      Do: 0,
Re: 2,
Mi: 4,
Fa: 5,
Sol: 7,
La: 9,
Si: 11
                    },
                  

                    [SHARP]: {
                      Si: 0,
Do: 1,
Re: 3,
Mi: 5,
Fa: 6,
Sol: 8,
La: 10
                    },
                  

                    [FLAT]: {
                      Re: 1,
Mi: 3,
Fa: 4,
Sol: 6,
La: 8,
Si: 10,
Do: 11
                    },
                  
              },
            
        },
      

        [NUMERIC]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      1: 0,
2: 2,
3: 4,
4: 5,
5: 7,
6: 9,
7: 11
                    },
                  

                    [SHARP]: {
                      7: 0,
1: 1,
2: 3,
3: 5,
4: 6,
5: 8,
6: 10
                    },
                  

                    [FLAT]: {
                      2: 1,
3: 3,
4: 4,
5: 6,
6: 8,
7: 10,
1: 11
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      1: 0,
2: 2,
3: 3,
4: 5,
5: 7,
6: 8,
7: 10
                    },
                  

                    [SHARP]: {
                      1: 1,
2: 3,
3: 4,
4: 6,
5: 8,
6: 9,
7: 11
                    },
                  

                    [FLAT]: {
                      2: 1,
3: 2,
4: 4,
5: 6,
6: 7,
7: 9,
1: 11
                    },
                  
              },
            
        },
      

        [NUMERAL]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      I: 0,
II: 2,
III: 4,
IV: 5,
V: 7,
VI: 9,
VII: 11
                    },
                  

                    [SHARP]: {
                      VII: 0,
I: 1,
II: 3,
III: 5,
IV: 6,
V: 8,
VI: 10
                    },
                  

                    [FLAT]: {
                      II: 1,
III: 3,
IV: 4,
V: 6,
VI: 8,
VII: 10,
I: 11
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      I: 0,
II: 2,
III: 3,
IV: 5,
V: 7,
VI: 8,
VII: 10
                    },
                  

                    [SHARP]: {
                      I: 1,
II: 3,
III: 4,
IV: 6,
V: 8,
VI: 9,
VII: 11
                    },
                  

                    [FLAT]: {
                      II: 1,
III: 2,
IV: 4,
V: 6,
VI: 7,
VII: 9,
I: 11
                    },
                  
              },
            
        },
      
  };
  
  export const GRADE_TO_KEY: Record<ChordType, Record<Mode, Record<ModifierMaybe, Record<number, string>>>> = {
    
        [SYMBOL]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'C',
2: 'D',
4: 'E',
5: 'F',
7: 'G',
9: 'A',
11: 'B',
                    },
                  

                    [SHARP]: {
                      0: 'B#',
1: 'C#',
3: 'D#',
5: 'E#',
6: 'F#',
8: 'G#',
10: 'A#',
                    },
                  

                    [FLAT]: {
                      1: 'Db',
3: 'Eb',
4: 'Fb',
6: 'Gb',
8: 'Ab',
10: 'Bb',
11: 'Cb',
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'C',
2: 'D',
4: 'E',
5: 'F',
7: 'G',
9: 'A',
11: 'B',
                    },
                  

                    [SHARP]: {
                      0: 'B#',
1: 'C#',
3: 'D#',
5: 'E#',
6: 'F#',
8: 'G#',
10: 'A#',
                    },
                  

                    [FLAT]: {
                      1: 'Db',
3: 'Eb',
4: 'Fb',
6: 'Gb',
8: 'Ab',
10: 'Bb',
11: 'Cb',
                    },
                  
              },
            
        },
      

        [SOLFEGE]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'Do',
2: 'Re',
4: 'Mi',
5: 'Fa',
7: 'Sol',
9: 'La',
11: 'Si',
                    },
                  

                    [SHARP]: {
                      0: 'Si#',
1: 'Do#',
3: 'Re#',
5: 'Mi#',
6: 'Fa#',
8: 'Sol#',
10: 'La#',
                    },
                  

                    [FLAT]: {
                      1: 'Reb',
3: 'Mib',
4: 'Fab',
6: 'Solb',
8: 'Lab',
10: 'Sib',
11: 'Dob',
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'Do',
2: 'Re',
4: 'Mi',
5: 'Fa',
7: 'Sol',
9: 'La',
11: 'Si',
                    },
                  

                    [SHARP]: {
                      0: 'Si#',
1: 'Do#',
3: 'Re#',
5: 'Mi#',
6: 'Fa#',
8: 'Sol#',
10: 'La#',
                    },
                  

                    [FLAT]: {
                      1: 'Reb',
3: 'Mib',
4: 'Fab',
6: 'Solb',
8: 'Lab',
10: 'Sib',
11: 'Dob',
                    },
                  
              },
            
        },
      

        [NUMERIC]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      0: '1',
2: '2',
4: '3',
5: '4',
7: '5',
9: '6',
11: '7',
                    },
                  

                    [SHARP]: {
                      0: '#7',
1: '#1',
3: '#2',
5: '#3',
6: '#4',
8: '#5',
10: '#6',
                    },
                  

                    [FLAT]: {
                      1: 'b2',
3: 'b3',
4: 'b4',
6: 'b5',
8: 'b6',
10: 'b7',
11: 'b1',
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      0: '1',
2: '2',
3: '3',
5: '4',
7: '5',
8: '6',
10: '7',
                    },
                  

                    [SHARP]: {
                      1: '#1',
3: '#2',
4: '#3',
6: '#4',
8: '#5',
9: '#6',
11: '#7',
                    },
                  

                    [FLAT]: {
                      1: 'b2',
2: 'b3',
4: 'b4',
6: 'b5',
7: 'b6',
9: 'b7',
11: 'b1',
                    },
                  
              },
            
        },
      

        [NUMERAL]: {
          
              [MAJOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'I',
2: 'II',
4: 'III',
5: 'IV',
7: 'V',
9: 'VI',
11: 'VII',
                    },
                  

                    [SHARP]: {
                      0: '#VII',
1: '#I',
3: '#II',
5: '#III',
6: '#IV',
8: '#V',
10: '#VI',
                    },
                  

                    [FLAT]: {
                      1: 'bII',
3: 'bIII',
4: 'bIV',
6: 'bV',
8: 'bVI',
10: 'bVII',
11: 'bI',
                    },
                  
              },
            

              [MINOR]: {
                
                    [NO_MODIFIER]: {
                      0: 'I',
2: 'II',
3: 'III',
5: 'IV',
7: 'V',
8: 'VI',
10: 'VII',
                    },
                  

                    [SHARP]: {
                      1: '#I',
3: '#II',
4: '#III',
6: '#IV',
8: '#V',
9: '#VI',
11: '#VII',
                    },
                  

                    [FLAT]: {
                      1: 'bII',
2: 'bIII',
4: 'bIV',
6: 'bV',
7: 'bVI',
9: 'bVII',
11: 'bI',
                    },
                  
              },
            
        },
      
  };
