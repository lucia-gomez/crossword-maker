import styled, { useTheme } from "styled-components";
import { SquareData } from "../types/types";

interface SquareStyleProps {
  numSquares: number;
  bgColor: string;
}

const numberOfFirstCellLastRow = (props: SquareStyleProps) =>
  props.numSquares * (props.numSquares - 1) + 1;

const Square = styled.div<SquareStyleProps>`
  box-shadow: inset -1px -1px ${(props) => props.theme.colors.squareBorder};
  background-color: ${(props) => props.bgColor};
  position: relative;

  // square in last column
  :nth-child(${(props) => props.numSquares}n) {
    box-shadow: inset 0px -1px ${(props) => props.theme.colors.squareBorder};
  }

  // square in last row
  :nth-child(n + ${numberOfFirstCellLastRow}) {
    box-shadow: inset -1px 0px ${(props) => props.theme.colors.squareBorder};
  }
`;

const SquareNumber = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

const SquareLetter = styled.svg`
  position: absolute;
  bottom: 0;
`;

interface Props {
  numSquares: number;
  squareData: SquareData;
  rowIndex: number;
  colIndex: number;
  isSelectedSquare: boolean;
  onSelect: (row: number, col: number) => void;
}

export default function CrosswordGridSquare(props: Props) {
  const {
    squareData,
    onSelect,
    isSelectedSquare,
    rowIndex,
    colIndex,
    numSquares,
  } = props;
  const theme = useTheme();

  const getBgColor = () => {
    if (squareData.content === null) {
      return theme.colors.squareBlocked;
    } else if (isSelectedSquare) {
      return theme.colors.squareSelected;
    }
    return "unset";
  };

  const onClickSquare = () => {
    if (squareData.content !== null) {
      onSelect(rowIndex, colIndex);
    }
  };

  return (
    <Square bgColor={getBgColor()} onClick={onClickSquare} {...{ numSquares }}>
      <SquareNumber viewBox="0 0 50 15" width="100%" height="30%">
        <text x="2" y="2" dominantBaseline="hanging">
          {squareData.number}
        </text>
      </SquareNumber>
      <SquareLetter viewBox="0 2 20 14" width="100%" height="70%">
        <text x="50%" y="100%" textAnchor="middle">
          {squareData.content}
        </text>
      </SquareLetter>
    </Square>
  );
}
