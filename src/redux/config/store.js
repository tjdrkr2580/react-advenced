//중앙 데이터 관리소(store)로

import { createStore } from "redux";
import { combineReducers } from "redux"; //reducer들을 한방에 묶는 역할

const rootReducer = combineReducers({}); //combineReducer를 통해서 묶은 reducer들을 rootReducer의 저장
const store = createStore(rootReducer); //그 묶은 reducer를 store로 생성

export default store;