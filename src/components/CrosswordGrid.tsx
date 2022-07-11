import { useState } from "react";
import styled from "styled-components";
import CrosswordGridSquare from "./CrosswordGridSquare";

interface GridStyleProps {
  numSquareWidth: number;
  numSquareHeight: number;
}

const Grid = styled.div<GridStyleProps>`
  margin: 20px;
  width: fit-content;
  border: 2px solid ${(props) => props.theme.colors.gridBorder};
  display: grid;
  grid-template:
    repeat(
      ${(props) => props.numSquareHeight},
      ${(props) => props.theme.squareSize}px
    )
    /
    repeat(
      ${(props) => props.numSquareWidth},
      ${(props) => props.theme.squareSize}px
    );
`;

interface Props {
  contents: (string | null)[][];
}

export default function CrosswordGrid({ contents }: Props) {
  const [isHorizontal, setHorizontal] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>();
  const numSquareWidth = contents[0].length;
  const numSquareHeight = contents.length;

  const isSelectedSquare = (row: number, col: number): boolean => {
    if (selectedIndex === undefined) {
      return false;
    }
    return row === selectedIndex[0] && col === selectedIndex[1];
  };

  const isSelectedClue = (row: number, col: number): boolean => {
    if (selectedIndex === undefined) {
      return false;
    }
    return false;

    // let r: number = selectedIndex[0];
    // let c: number = selectedIndex[1];
    // const selectedClueIndices = [];
    // if (isHorizontal) {
    //   // go left from selection
    //   while (c >= 0 && contents[r]) {

    //   }
    // }
  };

  const onSelectSquare = (row: number, col: number) => {
    setSelectedIndex([row, col]);
  };

  return (
    <Grid {...{ numSquareWidth, numSquareHeight }}>
      {Array.from(Array(numSquareWidth)).map((_, row) =>
        Array.from(Array(numSquareHeight)).map((_, col) => (
          <CrosswordGridSquare
            rowIndex={row}
            colIndex={col}
            content={contents[row][col]}
            isSelectedSquare={isSelectedSquare(row, col)}
            onSelect={onSelectSquare}
            key={`${row} ${col}`}
            {...{ numSquareWidth, numSquareHeight }}
          />
        ))
      )}
    </Grid>
  );
}
