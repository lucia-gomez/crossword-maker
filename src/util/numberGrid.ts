import { ClueData, GridData, SquareData } from "../types/types";

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

function handleAcross(
  contents: GridData,
  clues: ClueData,
  r: number,
  c: number,
  counter: number
): [GridData, ClueData] {
  // number it if it's an across clue start
  const acrossStart = getClueStartLeft(contents, r, c);
  if (acrossStart === c) {
    clues[`${counter}-across`] = [];
    contents[r][c].number = counter;
  }

  // add current square to across clue
  const acrossClue = contents[r][acrossStart].number! + "-across";
  clues[acrossClue].push([r, c]);

  return [contents, clues];
}

function handleDown(
  contents: GridData,
  clues: ClueData,
  r: number,
  c: number,
  counter: number
): [GridData, ClueData] {
  // number it if it's an unnumbered down clue start
  const downStart = getClueStartTop(contents, r, c);
  if (downStart === r) {
    clues[`${counter}-down`] = [];
    contents[r][c].number ??= counter;
  }

  // add current square to down clue
  const downClue = contents[downStart][c].number! + "-down";
  clues[downClue].push([r, c]);

  return [contents, clues];
}

export default function numberAndClueGrid(
  contentsIn: GridData
): [GridData, ClueData] {
  let counter = 1;
  let clues: ClueData = {};
  let contents = clearNumbers(contentsIn);
  for (let r = 0; r < contents.length; r++) {
    for (let c = 0; c < contents[0].length; c++) {
      const square = contents[r][c];
      if (square.content === null) continue;

      [contents, clues] = handleAcross(contents, clues, r, c, counter);
      [contents, clues] = handleDown(contents, clues, r, c, counter);

      // increase counter if we numbered something
      if (square.number !== null) counter++;
    }
  }
  return [contents, clues];
}

export function getFirstSquare(contents: GridData): [number, number] {
  for(let r = 0; r < contents.length; r++) {
    for(let c = 0; c < contents[0].length; c++) {
      if (contents[r][c] !== null) {
        return [r, c];
      }
    }
  }
  return [-1, -1];
}
