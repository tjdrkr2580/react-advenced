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

### - lifeCycle

# Redux

> 선행 지식들을 먼저 정리해놓고 배우기 [참고](https://velog.io/@shinwonse/React-2.-Redux%EB%9E%80%EB%91%90%EB%B2%88%EC%A7%B8)

## - 액션

상태의 어떠한 변화가 필요할 경우 액션이 발생함, 이것은 하나의 객체로 표현이 됨.

```ts
{
  type: "TOGGLE_VALUE";
}
```

액션 객체는 type 필드를 반드시 가지고 있어야 하고, 이 값을 액션의 이름이라고 생각하면 됨.
그리고 그 외의 값들은 상태 업데이트를 할 때 참고해야 할 값이며, 작성자 마음대로 넣을 수 있음.

```
{
  type: 'ADD_TODO'
  data: {
  	id: 1,
    text: '리덕스 배우기'
  }
}

{
  type: 'CHANGE_INPUT'
  text: '안녕하세요'
}
```

## - 액션 생성 함수

액션 객체를 만들어주는 함수이다.
이전에 설명한 액션이 이 동작에 대해 선언된 객체라면, 액션 생성 함수는 이 액션을 생성해 실제
객체로 만들어주는 함수이다.

```tsx
function addTodo(data) {
	return {
    	type: 'ADD_TODO'
        data
    }
}

const changeInput = text => ({
	type: 'CHANGE_INPUT'
    text
)};
```

어떠한 변화를 일으켜야 할 때마다 액션 객체를 만드렁야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고,
만드는 과정에서 실수로 정보를 놓칠 수도 있습니다. 이러한 일을 방지하기 위해 이를 함수로 만들어서 관리함.

## - 리듀서

리듀서는 state에 변화를 일으키는 함수이다, 액션을 만들어 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를
파라미터로 받아오고, 그 두 값을 참조하여 새로운 상태를 만들어 반환해준다.

```tsx
const initialState = {
  counter: 1
};
function reducer(state = initialState, action) { // default, 액션 객체
  switch (action.type) { // 액션 객체의 타입에 따라서
    case INCREMENT:
      return {
        counter: state.counter + 1;
      };
    default:
      return state; // 새로운 상태를 반환
  }
}
```

## - 스토어

프로젝트에 리덕스를 적용하기 위해 스토어를 만든다. 이때 한 개의 프로젝트는 하나의 스토어만 가질 수 있다.
스토어 안에 현재 애플리케이션의 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 함수를 지닌다.
스토어는 state를 수시로 확인해 View한테 변경된 사항을 알려준다.

## - 디스패치

디스패치는 스토어의 내장 함수 중 하나입니다, 디스패치는 `액션을 발생시키는 것` 이라 이해하면 된다고 한다.
이 함수는 dispatch(action)과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다, 디스패치가
액션을 발생시켜 스토어에게 상태 변화가 필요하다는 것을 알린다.

이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜 새로운 상태를 만들어 준다.

## - 구독

구독(Subscribe)도 스토어의 내장함수 중 하나이다, subscribe 함수 안에 리스너 함수를 파라미터로 넣어 호출해주면
이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출된다.

![이미지](https://velog.velcdn.com/images%2Fshinwonse%2Fpost%2F468299c2-35d1-4e27-ac26-2b4ea2ce6598%2Fimage.png)

Action Creator가 Action 객체를 생성하고 디스패치가 호출되면 스토어가 리듀서 함수를 실행시켜 새로운 상태를 만든다.

# Sparta Redux



```tsx
//중앙 데이터 관리소(store)로

import { createStore } from "redux";
import { combineReducers } from "redux"; //reducer들을 한방에 묶는 역할
import counter from "../modules/counter";
import users from "../modules/user";

const rootReducer = combineReducers({
  counter,
  users,
}); //combineReducer를 통해서 묶은 reducer들을 rootReducer의 저장
const store = createStore(rootReducer); //그 묶은 reducer를 store로 생성

export default store;

```

Store에서 나눠져있는 store를 combine을 통해서 가져온다.

그리고 그 합친 rootReducer를 store로 선언하고, export 시킨다.

```tsx
//초기 상태값

import { Action } from "redux";

const initialState = {
  number: 0,
};

//리듀서 : 'state에 변화를 일으키는 '함수'
//(1) state를 액션의 타입에 따라 변경하는 함수
//input : state, action

const counter = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default counter;

```

initialState는 state의 default 값이다.

reducer 안에는 state와 action이 들어가며,

액션 타입에 따라서 어떠한 코드를 실행해준다.



```tsx
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

```

useSelector는 redux의 hook이다. State 값을 가져올 수 있는 것 같다.



## 플러스, 마이너스 버튼을 만들어보자

```tsx
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

//counter.ts
const counter = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_ONE":
      return {
        number: state.number + 1,
      };
    case "MINUS_ONE":
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

```

reducer에 만들어놓은 action.type을 통해 state를 어떻게 할 것인지

정할 수 있는 것 같다.



근데 여기서 휴먼 에러가 발생할 수 있기 때문에 이를 방지하기 위해서

액션의 타입을 상수로 export 해주거나, 액션 생성 함수를 통해서

만들어준다면 더욱 베스트인 것 같다.



```tsx
//초기 상태값

import { Action } from "redux";

const initialState = {
  number: 0,
};

const ADD_ONE = "ADD_ONE";
const MINUS_ONE = "MINUS_ONE";

export const plusOne = () => {
  return {
    type: ADD_ONE,
  };
};

export const minusOne = () => {
  return {
    type: MINUS_ONE,
  };
};

//리듀서 : 'state에 변화를 일으키는 '함수'
//(1) state를 액션의 타입에 따라 변경하는 함수
//input : state, action

const counter = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_ONE:
      return {
        number: state.number + 1,
      };
    case MINUS_ONE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export default counter;

```

이렇게 관리를 해주게 되면 휴먼 에러가 날 일도 많이 없을 뿐더러,

개수가 많아져도 관리가 잘 될 것이다.



## Payload

`Payload` 에는 어떤 타입의 값이든 가질 수 있고, 이는 액션이 가지는

`Payload`  를 의미하고, 타입 또는 스테이터스를 제외한 액션의 정보는

모두 `Payload` 에 있어야 한다고 한다.



```tsx
//초기 상태값

import { Action, AnyAction } from "redux";

const initialState = {
  number: 0,
};

const ADD_ONE = "ADD_ONE";
const MINUS_ONE = "MINUS_ONE";
const Plus_N = "PLUS_N";
const Minus_N = "MINUS_N";

export const plusOne = () => {
  return {
    type: ADD_ONE,
  };
};

export const minusOne = () => {
  return {
    type: MINUS_ONE,
  };
};

export const plusN = (payload: any) => {
  return {
    type: Plus_N,
    payload,
  };
};

export const minusN = (payload: any) => {
  return {
    type: Minus_N,
    payload,
  };
};

//리듀서 : 'state에 변화를 일으키는 '함수'
//(1) state를 액션의 타입에 따라 변경하는 함수
//input : state, action
//action 객체라는 것은 action type을 payload 만큼 처리하는 것이다.

const counter = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_ONE:
      return {
        number: state.number + 1,
      };
    case MINUS_ONE:
      return {
        number: state.number - 1,
      };
    case Plus_N:
      return {
        number: state.number + action.payload,
      };
    case Minus_N:
      return {
        number: state.number - action.payload,
      };
    default:
      return state;
  }
};

export default counter;

```

그에 따라 변경한 코드 1.



```tsx
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

```

그에 따라 변경한 코드 2







