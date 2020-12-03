import { combineReducers } from "@reduxjs/toolkit";

import todoReducer from "./slices/todoSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
