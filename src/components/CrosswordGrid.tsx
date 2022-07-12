import { useEffect, useState } from "react";
import styled from "styled-components";
import { ClueData, GridData, SquareToCluesData } from "../types/types";
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

export default function CrosswordGrid(props: Props) {
  const { contents, clues, squareToClues, onUpdateSquare } = props;
  const numSquares = contents.length;

  const [isHorizontal, setHorizontal] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>();
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
      setSelectedClueIndices(clues[clueKey]);
    }
  }, [clues, selectedIndex, isHorizontal, squareToClues]);

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
