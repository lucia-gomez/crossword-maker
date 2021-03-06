import { useEffect, useRef } from "react";
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

  :nth-child(${(props) => props.numSquares * props.numSquares}) {
    box-shadow: none;
  }
`;

const SquareNumber = styled.svg`
  position: absolute;
  top: 3%;
  left: 3%;
`;

const SquareLetter = styled.svg`
  position: absolute;
  bottom: 0;
`;

const SquareInput = styled.input`
  position: absolute;
  top: 0;
  background-color: unset;
  color: transparent;
  caret-color: transparent;
  border: unset;
  height: 100%;
  width: 100%;
  padding: 0;
  z-index: 1;

  :focus {
    outline: none;
  }
`;

interface Props {
  numSquares: number;
  squareData: SquareData;
  rowIndex: number;
  colIndex: number;
  isSelectedSquare: boolean;
  isSelectedClue: boolean;
  onSelect: (row: number, col: number) => void;
  onUpdateSquare: (row: number, col: number, content: string | null) => void;
}

export default function CrosswordGridSquare(props: Props) {
  const {
    squareData,
    onSelect,
    onUpdateSquare,
    isSelectedSquare,
    isSelectedClue,
    rowIndex,
    colIndex,
    numSquares,
  } = props;
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const getBgColor = () => {
    if (squareData.content === null) {
      return theme.colors.squareBlocked;
    } else if (isSelectedSquare) {
      return theme.colors.squareSelected;
    } else if (isSelectedClue) {
      return theme.colors.clueSelected;
    }
    return "unset";
  };

  const onClickSquare = () => {
    if (squareData.content !== null) {
      onSelect(rowIndex, colIndex);
    }
  };

  const onDoubleClickSquare = () => {
    const newContent = squareData.content === null ? "" : null;
    onUpdateSquare(rowIndex, colIndex, newContent);
  };

  useEffect(() => {
    if (isSelectedSquare) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isSelectedSquare]);

  return (
    <Square
      bgColor={getBgColor()}
      onClick={onClickSquare}
      onDoubleClick={onDoubleClickSquare}
      {...{ numSquares }}
    >
      <SquareInput ref={inputRef} spellCheck="false" />
      <SquareNumber viewBox="0 0 50 15" width="100%" height="30%">
        <text x="0" y="0" dominantBaseline="hanging">
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
