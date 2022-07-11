import CrosswordGrid from "./components/CrosswordGrid";

function getEmptyGrid(size: number): (string | null)[][] {
  return Array.from(Array(size)).map((_) =>
    Array.from(Array(size)).map((_) =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    )
  );
}

function App() {
  const contents = getEmptyGrid(20);
  contents[4][0] = null;
  contents[4][1] = null;
  contents[4][2] = null;
  contents[5][0] = null;
  contents[6][0] = null;

  contents[12][12] = null;
  contents[11][12] = null;
  contents[12][13] = null;
  contents[11][13] = null;
  return <CrosswordGrid contents={contents} />;
}

export default App;
