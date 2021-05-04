import React, { useReducer, useState } from "react";
import "./App.css";
import Todo from "./Todo";

export const ACTIONS = {
  NEW_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.NEW_TODO:
      return [...todos, newToDo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      console.log("cokolwiek");
  }
}

function newToDo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.NEW_TODO, payload: { name: name } })
        }
      >
        Add new task
      </button>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </form>
  );
}

export default App;
