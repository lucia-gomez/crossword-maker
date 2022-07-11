import { GridData, SquareData } from "../types/types";

function getClueStart(squares: SquareData[]): number {
  // indices of blocked squares, or -1 for edge
  const nonLetters = squares.map((square, idx) =>
    square.content === null ? idx : -1
  );
  // clue start is 1 over from the nearest blocker
  return Math.max(0, Math.max(...nonLetters) + 1);
}

function getClueStartLeft(contents: GridData, r: number, c: number): number {
  const leftOfSquare = contents[r].slice(0, c);
  return getClueStart(leftOfSquare);
}

function getClueStartTop(contents: GridData, r: number, c: number): number {
  const aboveSquare = contents.map((row) => row[c]).slice(0, r);
  return getClueStart(aboveSquare);
}

function clearNumbers(contents: GridData) {
  contents.forEach((row) => row.forEach((square) => (square.number = null)));
  return contents;
}

export default function numberGrid(contents: GridData): GridData {
  let counter = 1;
  clearNumbers(contents).forEach((row, r) =>
    row.forEach((square, c) => {
      if (square.content === null) return;

      // number it if it's an across clue start
      const acrossStart = getClueStartLeft(contents, r, c);
      if (acrossStart === c) {
        square.number = counter++;
      }

      // number it if it's an unnumbered down clue start
      const downStart = getClueStartTop(contents, r, c);
      if (square.number === null && downStart === r) {
        square.number = counter++;
      }
    })
  );
  return contents;
}
