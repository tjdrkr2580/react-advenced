import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/config/store";
import { minusOne, plusOne } from "./redux/modules/counter";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => {
    return state.counter;
  });
  return (
    <div className="App">
      <h1>Now count : {counter.number}</h1>
      <button onClick={() => dispatch(plusOne())}>+</button>
      <button onClick={() => dispatch(minusOne())}>-</button>
    </div>
  );
}

export default App;
