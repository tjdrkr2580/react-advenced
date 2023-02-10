import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/config/store";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => {
    return state.counter;
  });
  return (
    <div className="App">
      <h1>Now count : {counter.number}</h1>
      <button
        onClick={() =>
          dispatch({
            type: "ADD_ONE",
          })
        }
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "MINUS_ONE",
          })
        }
      >
        -
      </button>
    </div>
  );
}

export default App;
