ChordSheet
  = metadataLines:Metadata? lines:ChordSheetContents? {
      return {
        type: "chordSheet",
        lines: [
          ...metadataLines,
          ...lines,
        ]
      };
    }

ChordSheetContents
  = newLine:NewLine? lines:ChordSheetLineWithNewLine* trailingLine:ChordSheetLine? {
    const allLines = combineChordSheetLines(newLine, lines, trailingLine);
    const arrangedLines = arrangeChordSheetLines(allLines);
    return arrangedLines;
  }

ChordSheetLineWithNewLine
  = item:ChordSheetLine NewLine {
    return item;
  }

ChordSheetLine
  = line:DirectionLine { return line; }
  / line:InlineMetadata { return line; }
  / &(ChordsLine !WordChar) line:ChordsLine { return line; }
  / line:LyricsLine { return line; }

ChordLyricsLines
  = chordsLine:ChordsLine NewLine lyrics:NonEmptyLyrics {
      const chords = chordsLine.items;

      const chordLyricsPairs = chords.map((chord, i) => {
        const nextChord = chords[i + 1];
        const start = chord.column - 1;
        const end = nextChord ? nextChord.column - 1 : lyrics.length;
        const pairLyrics = lyrics.substring(start, end);
        const result = /(\s+)(\S+)/.exec(pairLyrics);
        const secondWordPosition = result ? (result.index + result[1].length) : null;

        const chordData = (chord.type === "chord") ? { chord } : { chords: chord.value };

        if (secondWordPosition && secondWordPosition < end) {
          return [
            { type: "chordLyricsPair", ...chordData, lyrics: pairLyrics.substring(0, secondWordPosition).trim() + " " },
            { type: "chordLyricsPair", chords: "", lyrics: pairLyrics.substring(secondWordPosition) },
          ];
        }
		    const trimmedLyrics = /.+\s+$/.test(pairLyrics) ? pairLyrics.trim() + " " : pairLyrics;
        return { type: "chordLyricsPair", ...chordData, lyrics: trimmedLyrics };
      }).flat();

      const firstChord = chords[0];

      if (firstChord && firstChord.column > 1) {
      	const firstChordPosition = firstChord.column;

        if (firstChordPosition > 0) {
          chordLyricsPairs.unshift({
            type: "chordLyricsPair",
            chords: "",
            lyrics: lyrics.substring(0, firstChordPosition - 1),
          });
        }
      }

      return { type: "line", items: chordLyricsPairs };
    }

SingleChordsLine
  = chordsLine:ChordsLine & (NewLine ChordsLine) {
      return chordsLine;
    }

ChordsLine
  = items:(ChordWithSpacing / RhythmSymbolWithSpacing)+ {
      return {
        type: "chordsLine",
        items
      };
    }

RhythmSymbolWithSpacing
  = _ symbol:RhythmSymbol _ {
      return symbol;
    }

RhythmSymbol
  = symbol:("/" / "|" / "-" / "x") {
      return {
        type: "symbol",
        value: symbol,
        column: location().start.column
      };
    }

LyricsLine
  = lyrics:Lyrics {
    return { type: "lyricsLine", content: lyrics };
  }

Lyrics
  = $(WordChar*)

NonEmptyLyrics
  = $(WordChar+)

ChordWithSpacing
  = _ chord:Chord _ {
      return chord;
    }

DirectionLine
  = line:$(_ keyword:Keyword _ WordChar* _) {
      return {
        type: "line",
        items: [
          { type: "tag", name: "comment", value: line }
        ]
      };
    }

Keyword
  = "verse"i
  / "chorus"i
  / "bridge"i
  / "tag"i
  / "interlude"i
  / "instrumental"i
  / "intro"i

WordChar
  = [^\n\r]

Metadata
  = pairs:MetadataPairWithNewLine* trailingPair:MetadataPair? MetadataSeparator? {
      return [...pairs, trailingPair]
        .filter(x => x)
        .map(([key, value]) => ({
          type: "line",
          items: [
            { type: "tag", name: key, value },
          ],
        }));
    }

InlineMetadata
  = key:$(MetadataKey) _ Colon _ value:$(MetadataValue) {
      return {
        type: "line",
        items: [
          { type: "tag", name: key, value },
        ],
      }
    }

MetadataPairWithNewLine
  = pair:MetadataPair NewLine {
      return pair;
    }

MetadataPair
  = MetadataPairWithBrackets / MetadataPairWithoutBrackets

MetadataPairWithBrackets
  = "{" _ pair:MetadataPairWithoutBrackets _ "}" {
    return pair;
  }

MetadataPairWithoutBrackets
  = key:$(MetadataKey) _ Colon _ value:$(MetadataValue) {
    return [key, value];
  }

Colon
  = ":"

MetadataKey
  = [a-zA-Z0-9-_]+

MetadataValue
  = [^\n\r}]+

MetadataSeparator
  = "---" NewLine

_ "whitespace"
  = [ \t]*

NewLine
  = CarriageReturn / LineFeed / CarriageReturnLineFeed

CarriageReturnLineFeed
  = CarriageReturn LineFeed

LineFeed
  = "\n"

CarriageReturn
  = "\r"
