import {
  GetTodosRequest,
  AddTodoRequest,
  FinishTodoRequest,
} from "./todo_pb.js";
import { TodoServiceClient } from "./todo_grpc_web_pb.js";
import { useEffect, useState } from "react";

const client = new TodoServiceClient("http://localhost:8080");

const getTodos = () => {
  const request = new GetTodosRequest();
  client.getTodos(request, {}, (err, response) => {
    if (err) console.error(err);
    if (response) {
      const todos = response.toObject().todosList;
      console.log("LIST OF TODOS: ", todos);
    }
  });
};

function App() {
  const [inputValue, setInputValue] = useState("");

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
      <button style={{ padding: 10 }} onClick={addTodo}>
        Add todo
      </button>
    </>
  );
}

export default App;
