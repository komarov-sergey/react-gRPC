import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todosSlice",
  initialState,
  reducers: {
    setTodos(state, action) {
      const todos = action.payload;
      state.todos = todos;
    },
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
