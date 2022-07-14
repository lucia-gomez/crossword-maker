import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ClueData, GridData, SquareToCluesData } from "../types/types";
import { getFirstSquare } from "../util/numberGrid";
import { getSquareToClues } from "../util/squareToClues";
import CrosswordGridSquare from "./CrosswordGridSquare";

interface GridStyleProps {
  numSquares: number;
}

const Grid = styled.div<GridStyleProps>`
  margin: 20px;
  width: 90vmin;
  height: 90vmin;
  border: 2px solid ${(props) => props.theme.colors.gridBorder};
  display: grid;
  grid-template:
    repeat(${(props) => props.numSquares}, 1fr) /
    repeat(${(props) => props.numSquares}, 1fr);
`;

interface Props {
  contents: GridData;
  clues: ClueData;
  squareToClues: SquareToCluesData;
  onUpdateSquare: (r: number, c: number, content: string | null) => void;
}

const isValidChar = (code: number): boolean => {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

export default function CrosswordGrid(props: Props) {
  const { contents, clues, squareToClues, onUpdateSquare } = props;
  const numSquares = contents.length;

  const [isHorizontal, setHorizontal] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>(
    getFirstSquare(contents)
  );
  const [selectedClueIndices, setSelectedClueIndices] = useState<
    [number, number][]
  >([]);

  const isSelectedSquare = (row: number, col: number): boolean => {
    if (selectedIndex === undefined) {
      return false;
    }
    return row === selectedIndex[0] && col === selectedIndex[1];
  };

  const isSelectedClueSquare = (row: number, col: number): boolean => {
    return (
      selectedClueIndices.filter(([r, c]) => r === row && c === col).length > 0
    );
  };

  const onSelectSquare = (row: number, col: number) => {
    if (
      selectedIndex !== undefined &&
      selectedIndex[0] === row &&
      selectedIndex[1] === col
    ) {
      setHorizontal(!isHorizontal);
    }
    setSelectedIndex([row, col]);
  };

  useEffect(() => {
    if (selectedIndex !== undefined) {
      const squareClues = getSquareToClues(squareToClues, selectedIndex);
      const clueKey = isHorizontal ? squareClues[0] : squareClues[1];
      setSelectedClueIndices(clues[clueKey] ?? []);
    }
  }, [clues, selectedIndex, isHorizontal, squareToClues]);

  const getAfterSquare = useCallback(
    (n: number) => (n < numSquares - 1 ? n + 1 : n),
    [numSquares]
  );

  const getBeforeSquare = useCallback((n: number) => (n > 0 ? n - 1 : 0), []);

  const onAddLetter = useCallback(
    (key: string) => {
      if (selectedIndex === undefined) return;
      const [r, c] = selectedIndex;

      onUpdateSquare(r, c, key);
      const cursor: [number, number] = isHorizontal
        ? [r, getAfterSquare(c)]
        : [getAfterSquare(r), c];
      if (contents[cursor[0]][cursor[1]].content !== null) {
        setSelectedIndex(cursor);
      }
    },
    [isHorizontal, onUpdateSquare, selectedIndex, contents, getAfterSquare]
  );

  // if current is full, delete and stay there
  // if current is empty, delete previous and go there
  const onDeleteLetter = useCallback(() => {
    if (selectedIndex === undefined) return;
    const [r, c] = selectedIndex;
    const currentContent = contents[r][c].content;

    if (currentContent !== "") {
      onUpdateSquare(r, c, "");
    } else {
      const cursor: [number, number] = isHorizontal
        ? [r, getBeforeSquare(c)]
        : [getBeforeSquare(r), c];
      onUpdateSquare(cursor[0], cursor[1], "");
      setSelectedIndex(cursor);
    }
  }, [isHorizontal, onUpdateSquare, selectedIndex, contents, getBeforeSquare]);

  useEffect(() => {
    const onKeyDown = (evt: KeyboardEvent) => {
      if (isValidChar(evt.keyCode)) {
        onAddLetter(evt.key.toUpperCase());
      } else if (evt.keyCode === 8) {
        onDeleteLetter();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onUpdateSquare, onAddLetter, onDeleteLetter]);

  return (
    <Grid {...{ numSquares }}>
      {Array.from(Array(numSquares)).map((_, row) =>
        Array.from(Array(numSquares)).map((_, col) => (
          <CrosswordGridSquare
            rowIndex={row}
            colIndex={col}
            squareData={contents[row][col]}
            isSelectedSquare={isSelectedSquare(row, col)}
            isSelectedClue={isSelectedClueSquare(row, col)}
            onSelect={onSelectSquare}
            key={`${row} ${col}`}
            {...{ numSquares, onUpdateSquare }}
          />
        ))
      )}
    </Grid>
  );
}
