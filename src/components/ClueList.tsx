import styled from "styled-components";
import { ClueData } from "../types/types";

const Clues = styled.div`
  margin: 20px;
  overflow-y: scroll;
  height: 90vmin;
`;

const ClueSubset = styled.div`
  margin: 10px 0px;
`;

const ClueSubsetTitle = styled.h3`
  margin: 0px;
`;

interface ClueStyleProps {
  isSelected: boolean;
}
const Clue = styled.p<ClueStyleProps>`
  margin: 0px;
  cursor: pointer;
  /* width: fit-content; */
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.clueSelected : "unset"};
  padding: 1px;
  border-radius: 5px;
`;

interface Props {
  clues: ClueData;
  onSelectClue: (clue: string) => void;
  selectedClue: string;
}

export default function ClueList(props: Props) {
  const { clues, onSelectClue, selectedClue } = props;
  const getClueSubset = (direction: string) => (
    <div>
      <ClueSubsetTitle>{direction}</ClueSubsetTitle>
      <ClueSubset>
        {Object.entries(clues)
          .filter(([clue, _]) => clue.includes(direction.toLowerCase()))
          .map(([clue, _]) => (
            <Clue
              isSelected={selectedClue === clue}
              onClick={() => onSelectClue(clue)}
              key={clue}
            >
              {clue}
            </Clue>
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
