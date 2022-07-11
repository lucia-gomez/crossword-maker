import CrosswordGrid from "./components/CrosswordGrid";
import { GridData } from "./types/types";

function getEmptyGrid(size: number): GridData {
  return Array.from(Array(size)).map((_) =>
    Array.from(Array(size)).map((_) => ({
      content: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      isSpecial: false,
      number: 10,
    }))
  );
}

function numberGrid(contents: GridData): GridData {
  return contents;
}

function App() {
  let contents = getEmptyGrid(10);
  contents[4][0].content = null;
  contents[4][1].content = null;
  contents[4][2].content = null;
  contents[5][0].content = null;
  contents[6][0].content = null;

  // contents[12][12].content = null;
  // contents[11][12].content = null;
  // contents[12][13].content = null;
  // contents[11][13].content = null;
  contents = numberGrid(contents);
  return <CrosswordGrid contents={contents} />;
}

export default App;
