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
