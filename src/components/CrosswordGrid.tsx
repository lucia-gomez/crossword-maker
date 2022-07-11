import { useState } from "react";
import styled from "styled-components";
import { SquareData } from "../types/types";
import numberGrid from "../util/numberGrid";
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
  contents: SquareData[][];
}

export default function CrosswordGrid(props: Props) {
  const [contents, setContents] = useState(numberGrid(props.contents));
  const [isHorizontal, setHorizontal] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>();
  const numSquares = contents.length;

  const isSelectedSquare = (row: number, col: number): boolean => {
    if (selectedIndex === undefined) {
      return false;
    }
    return row === selectedIndex[0] && col === selectedIndex[1];
  };

  const onSelectSquare = (row: number, col: number) => {
    setSelectedIndex([row, col]);
  };

  const updateSquareContent = (
    row: number,
    col: number,
    content: string | null
  ) => {
    let copy = [...contents];
    copy[row][col].content = content;
    if (content === null || contents[row][col] === null) {
      setContents(numberGrid(copy));
    } else {
      setContents(copy);
    }
  };

  return (
    <Grid {...{ numSquares }}>
      {Array.from(Array(numSquares)).map((_, row) =>
        Array.from(Array(numSquares)).map((_, col) => (
          <CrosswordGridSquare
            rowIndex={row}
            colIndex={col}
            squareData={contents[row][col]}
            isSelectedSquare={isSelectedSquare(row, col)}
            onSelect={onSelectSquare}
            key={`${row} ${col}`}
            {...{ numSquares, updateSquareContent }}
          />
        ))
      )}
    </Grid>
  );
}
