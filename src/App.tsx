import React from "react";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => {
    return state;
  });
  console.log(data);

  return <div className="App"></div>;
}

export default App;
