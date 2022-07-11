import styled, { useTheme } from "styled-components";

interface SquareStyleProps {
  numSquareWidth: number;
  numSquareHeight: number;
  bgColor: string;
}

const numberOfFirstCellLastRow = (props: SquareStyleProps) =>
  props.numSquareWidth * (props.numSquareHeight - 1) + 1;

const Square = styled.div<SquareStyleProps>`
  border-bottom: 1px solid ${(props) => props.theme.colors.squareBorder};
  border-right: 1px solid ${(props) => props.theme.colors.squareBorder};
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;

  // square in last column
  :nth-child(${(props) => props.numSquareWidth}n) {
    border-right: none;
  }

  // square in last row
  :nth-child(n + ${numberOfFirstCellLastRow}) {
    border-bottom: none;
  }
`;

interface Props {
  numSquareWidth: number;
  numSquareHeight: number;
  content: string | null;
  rowIndex: number;
  colIndex: number;
  isSelectedSquare: boolean;
  onSelect: (row: number, col: number) => void;
}

export default function CrosswordGridSquare(props: Props) {
  const {
    content,
    onSelect,
    isSelectedSquare,
    rowIndex,
    colIndex,
    numSquareWidth,
    numSquareHeight,
  } = props;
  const theme = useTheme();

  const getBgColor = () => {
    if (content === null) {
      return theme.colors.squareBlocked;
    } else if (isSelectedSquare) {
      return theme.colors.squareSelected;
    }
    return "unset";
  };

  const onClickSquare = () => {
    if (content !== null) {
      onSelect(rowIndex, colIndex);
    }
  };

  return (
    <Square
      bgColor={getBgColor()}
      onClick={onClickSquare}
      {...{ numSquareHeight, numSquareWidth }}
    >
      {content}
    </Square>
  );
}
