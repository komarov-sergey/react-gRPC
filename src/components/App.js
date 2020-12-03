import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTodos } from "../redux/slices/todoSlice";
import {
  GetTodosRequest,
  AddTodoRequest,
  FinishTodoRequest,
} from "../grpc/todo_pb.js";
import { TodoServiceClient } from "../grpc/todo_grpc_web_pb.js";

const client = new TodoServiceClient("http://localhost:8080");

function App() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const addTodo = () => {
    const req = new AddTodoRequest();
    req.setText(inputValue);
    setInputValue("");

    client.addTodo(req, {}, (err, res) => {
      if (err) console.error({ err });

      const todo = res.toObject().todo;
      console.log("NEW TODO: ", todo);

      getTodos();
    });
  };

  const getTodos = () => {
    const request = new GetTodosRequest();
    client.getTodos(request, {}, (err, response) => {
      if (err) console.error(err);
      if (response) {
        const todosRes = response.toObject().todosList;
        console.log("LIST OF TODOS: ", todosRes);
        dispatch(setTodos(todosRes));
      }
    });
  };

  const clickHandler = () => {
    if (inputValue.length === 0) return;
    addTodo(inputValue);
  };

  const finishHandler = (id) => {
    const request = new FinishTodoRequest();
    request.setId(id);

    client.finishTodo(request, {}, (err, response) => {
      if (err) {
        console.error(err);
      }

      const todo = response.toObject().todo;
      console.log("FINISHED TODO: ", todo);

      getTodos();
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button style={{ padding: 10 }} onClick={clickHandler}>
        Add todo
      </button>
      {todos.todos &&
        todos.todos.map((elem) => {
          let doneStyle = elem.done ? "black" : "red";
          return (
            <div
              onClick={() => finishHandler(elem.id)}
              key={elem.id}
              style={{ color: doneStyle }}
            >
              {elem.text}
            </div>
          );
        })}
    </>
  );
}

export default App;
