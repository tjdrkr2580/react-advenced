import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/config/store";
import { minusN, minusOne, plusN, plusOne } from "./redux/modules/counter";

function App() {
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => {
    return state.counter;
  });
  useEffect(() => {
    console.log(number);
  }, [number]);

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNumber(+value);
  };
  return (
    <div className="App">
      <h1>Now count : {counter.number}</h1>
      <input type="number" value={number} onChange={onChangeNumber} />
      <button onClick={() => dispatch(plusN(number))}>+</button>
      <button onClick={() => dispatch(minusN(number))}>-</button>
    </div>
  );
}

export default App;
