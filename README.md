# React Advenced

- 스파르타코딩
- 그 외 기록

### - Re-rendering의 발생 조건

1. 컴포넌트에서 state가 바뀌었을 때
2. 컴포넌트가 내려받은 Props가 변경되었을 때
3. 부모 컴포넌트가 리-렌더링 된 경우 자식 컴포넌트는 모두..

### - 최적화 설명

1. memo(React.memo) : 컴포넌트를 캐싱
2. useMemo : 값을 캐싱
3. useCallback : 함수를 캐싱

## 기타 설명

- 함수형 컴포넌트는 그냥 함수이다.
- 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수를 호출해서 실행되는 것을 말함. 함수가 실행될 때마다 내부에 선언되어 있던 표현식도 매번 다시 선언되어 사용된다.
- 컴포넌트는 자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다 리렌더링이 된다.
- 하위 컴포넌트에 React.memo와 같이 최적화 설정을 해주지 않는다면 props가 변경이 되지 않더라도 리렌더링이 되는 것이 기본이다.

## React Hooks - 최적화

### - useCallback

React.memo는 컴포넌트를 메모이제이션 했다면, useCallback은 인자로 들어오는 함수 자체를 기억한다.

새로 렌더링될 때마다 주소 값을 바꾸기 때문에 이전에 있던 함수와 재렌더링이 되었을 때의 함수랑 다른 것이라고

이해하면 될 것 같다. 그 주소값을 메모리제이션을 해주는 것이 useCallback인 것 같다.

재렌더링될 때마다 함수가 재실행이 되는 것이 아닌, 주소값을 기억해둠으로써 함수가 필요할 때를 제외하고는

재렌더링이 되지 않게 하기 위해 사용하는 Hook이라고 이해했다. 그리고 뒤에 deps에서는 해당 함수가 언제 다시

다른 형태로 기억되게 될 것인지 의존성을 부여하는 것 같다.



실제 프로젝트에서 사용을 해보면서 익혀보도록 하자.

```tsx
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

```





### - React.memo

```tsx
function App() {
  console.log("렌더링이 되었다.");
  const [first, setfirst] = useState(0);
  return (
    <div className="App">
      <h1>카운트 예제</h1>
      <p>현재 카운트 : {first}</p>
      <button onClick={() => setfirst((prev) => prev + 1)}>+</button>
      <button onClick={() => setfirst((prev) => prev - 1)}>-</button>
      <Box1 />
      <Box2 />
      <Box3 />
    </div>
  );
}

export default App;
```

Box1, Box2, Box3은 부모 컴포넌트로부터 Props를 받은 것도 아닌데, first가 변경이 되었다는 이유로

의미없는 재렌더링이 된다. 이 부분을 방지하여준다. 그리고 원하는 props의 변화에 재렌더링이 일어난다.

```tsx
export default React.memo(Box1);
```

### - useMemo

## LifeCycle
