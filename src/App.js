import React, { useReducer, useState } from "react";
import "./App.css";

const ACTIONS = {
  NEW_TODO: "add-todo",
};

function reducer(todos, action) {
  switch (action) {
    case ACTIONS.NEW_TODO:
      return [...todos, newToDo(action.payload.name)];
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
    dispatch({ type: ACTIONS.NEW_TODO, payload: { name: name } });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}

export default App;
