import { useEffect, useState } from "react";
import styled from "styled-components";
import ClueList from "./components/ClueList";
import CrosswordGrid from "./components/CrosswordGrid";
import { ClueData, GridData, SquareToCluesData } from "./types/types";
import numberAndClueGrid from "./util/numberGrid";
import { buildSquaresToCluesMap } from "./util/squareToClues";

const Layout = styled.div`
  @media only screen and (min-width: 576px) {
    display: grid;
    grid-template-columns: 93vmin 1fr;
  }

  @media only screen and (min-width: 576px) {
  }

  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
`;

function getEmptyGrid(size: number): GridData {
  const contents: GridData = Array.from(Array(size)).map((_) =>
    Array.from(Array(size)).map((_) => ({
      // content: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      content: "",
      isSpecial: false,
      number: null,
    }))
  );
  contents[0][5].content = null;
  contents[4][0].content = null;
  contents[4][1].content = null;
  contents[4][2].content = null;
  contents[5][0].content = null;
  contents[6][0].content = null;
  contents[5][6].content = null;

  contents[12][12].content = null;
  contents[11][12].content = null;
  contents[12][13].content = null;
  contents[11][13].content = null;
  return contents;
}

function App() {
  const [contents, setContents] = useState<GridData>(getEmptyGrid(15));
  const [clues, setClues] = useState<ClueData>({});
  const [squareToClues, setSquareToClues] = useState<SquareToCluesData>({});

  useEffect(() => {
    const [newContents, newClues] = numberAndClueGrid(contents);
    setContents(newContents);
    setClues(newClues);
    setSquareToClues(buildSquaresToCluesMap(newClues));
  }, [contents]);

  const onUpdateSquare = (r: number, c: number, content: string | null) => {
    let copy = [...contents];
    copy[r][c].content = content;
    if (content === null || contents[r][c] === null) {
      const [newContents, newClues] = numberAndClueGrid(copy);
      setContents(newContents);
      setClues(newClues);
      setSquareToClues(buildSquaresToCluesMap(newClues));
    } else {
      setContents(copy);
    }
  };

  return (
    <Layout>
      <CrosswordGrid {...{ contents, clues, squareToClues, onUpdateSquare }} />
      <ClueList {...{ clues }} />
    </Layout>
  );
}

export default App;
