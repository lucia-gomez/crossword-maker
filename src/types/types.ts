export type SquareData = {
  content: string | null,
  isSpecial: boolean,
  number: number | null,
};

export type GridData = SquareData[][];

export type ClueData = {
  [key: string]: [number, number][];
}