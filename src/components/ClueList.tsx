import styled from "styled-components";
import { ClueData } from "../types/types";

const Clues = styled.div`
  margin: 20px;
  overflow-y: scroll;
  height: 90vmin;
  /* -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  } */
`;

const ClueSubset = styled.div`
  margin: 10px 0px;
`;

const ClueSubsetTitle = styled.h3`
  margin: 0px;
`;

const Clue = styled.p`
  margin: 0px;
  cursor: pointer;
  width: fit-content;
`;

interface Props {
  clues: ClueData;
}

export default function ClueList({ clues }: Props) {
  const getClueSubset = (direction: string) => (
    <div>
      <ClueSubsetTitle>{direction}</ClueSubsetTitle>
      <ClueSubset>
        {Object.entries(clues)
          .filter(([clue, _]) => clue.includes(direction.toLowerCase()))
          .map(([clue, _]) => (
            <Clue key={clue}>{clue}</Clue>
          ))}
      </ClueSubset>
    </div>
  );

  return (
    <Clues>
      {getClueSubset("Across")}
      {getClueSubset("Down")}
    </Clues>
  );
}
