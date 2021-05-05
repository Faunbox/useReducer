import React, { useState } from "react";
import { ACTIONS } from "../Global/Reducer";

const Todo = ({ todo, dispatch }) => {
  const [edit, setEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState("");

  return (
    <div>
      <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
        {todo.name}
      </span>
      <button
        onClick={() => {
          dispatch({
            type: ACTIONS.TOGGLE_TODO,
            payload: {
              id: todo.id,
            },
          });
        }}
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: {
              id: todo.id,
            },
          })
        }
      >
        Delete
      </button>
      <button onClick={() => setEdit((prevState) => !prevState)}>Edit</button>

      {edit && (
        <label for="edit">
          <input
            type="text"
            value={todo.name}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.EDIT_TODO,
                payload: {
                  name: updatedTask,
                },
              })
            }
          >
            OK
          </button>
        </label>
      )}
    </div>
  );
};

export default Todo;
