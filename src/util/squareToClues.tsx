import { ClueData, SquareToCluesData } from "../types/types";

const indicesToKey = ([r, c]: [number, number]): string => `${r}-${c}`;

export function buildSquaresToCluesMap(clues: ClueData): SquareToCluesData {
  const squareToClues: SquareToCluesData = {};
  Object.entries(clues).forEach(([clue, squares]) =>
    squares.forEach((square) => {
      const key = indicesToKey(square);
      if (squareToClues[key] === undefined) {
        squareToClues[key] = [];
      }
      squareToClues[key].push(clue);
    })
  );
  return squareToClues;
}

export function getSquareToClues(
  squaresToClues: SquareToCluesData,
  indices: [number, number]
): string[] {
  const key = indicesToKey(indices);
  return squaresToClues[key].sort((a, b) => {
    const aSub = a.substring(a.indexOf("-"));
    const bSub = b.substring(b.indexOf("-"));
    return aSub === bSub ? 0 : aSub < bSub ? -1 : 1;
  });
}
