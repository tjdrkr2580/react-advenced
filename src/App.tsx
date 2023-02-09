import React, { useCallback, useEffect, useState } from "react";
import Box1 from "./components/Box1";
import Box2 from "./components/Box2";
import Box3 from "./components/Box3";
import BtnReset from "./components/BtnReset";

function App() {
  const [value, setValue] = useState("");

  const someFunc = useCallback(() => {
    console.log(`someFuc : number : ${value}`);
  }, [value]);

  // const someFunc = () => {
  //   console.log(`someFuc : number : ${value}`);
  // };

  useEffect(() => {
    console.log("변경 감지");
  }, [someFunc]);

  return (
    <div className="App">
      <input type="number" onChange={(e) => setValue(e.target.value)} />
      <button onClick={someFunc}>ddd</button>
    </div>
  );
}

export default App;
