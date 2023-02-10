//초기 상태값

import { Action } from "redux";

const initialState = {
  number: 0,
};

export const ADD_ONE = "ADD_ONE";
export const MINUS_ONE = "MINUS_ONE";

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
