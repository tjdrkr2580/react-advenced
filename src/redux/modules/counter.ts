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
