//초기 상태값

import { Action } from "redux";

const initialState = {
  userId: 123,
};

//리듀서 : 'state에 변화를 일으키는 '함수'
//(1) state를 액션의 타입에 따라 변경하는 함수
//input : state, action

const users = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default users;
