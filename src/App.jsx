import { useState } from "react";
import Menu from "./components/MenuSection/Menu";
import "./App.css";
import MenuDefault from "./components/MenuSection/MenuDefault";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Menu></Menu>
    </>
  );
}

export default App;
