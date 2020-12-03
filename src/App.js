import logo from "./logo.svg";
import "./App.css";

import {
  GetTodosRequest,
  AddTodoRequest,
  FinishTodoRequest,
} from "./todo_pb.js";
import { TodoServiceClient } from "./todo_grpc_web_pb.js";
import { useEffect } from "react";

const client = new TodoServiceClient("http://localhost:8080");

function App() {
  useEffect(() => {
    console.log("useEffect");
    const request = new GetTodosRequest();

    client.getTodos(request, {}, (err, response) => {
      if (err) console.error(err);
      if (response) {
        const todos = response.toObject().todosList;
        console.log("LIST OF TODOS: ", todos);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{ padding: 10 }}>Click for grpc request</button>
      </header>
    </div>
  );
}

export default App;
