import React, { useState } from "react";
import { ACTIONS } from "../Global/Reducer";
import styled from "styled-components";

const TodoWrapper = styled.div`
  padding: 10px 0;
`;

const Button = styled.button`
  margin: 0px 5px;
  padding: ${(props) => props.padding};
`;

const Input = styled.input`
  margin: 0 5px;
  padding: 5px;
`;

const Todo = ({ todo, dispatch }) => {
  const [edit, setEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState("");

  return (
    <TodoWrapper>
      <span
        style={{
          color: todo.complete ? "green" : "#000",
          textDecoration: todo.complete ? "underline" : "none",
        }}
      >
        {todo.name}
      </span>
      <Button
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
      </Button>
      <Button
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
      </Button>
      <Button onClick={() => setEdit((prevState) => !prevState)}>Edit</Button>

      {edit && (
        <label>
          <Input
            type="text"
            value={updatedTask}
            placeholder="tekst dłuższy jak 3 znaki"
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <Button
            padding="5px"
            onClick={() => {
              updatedTask.length >= 3 &&
                dispatch({
                  type: ACTIONS.EDIT_TODO,
                  payload: {
                    id: todo.id,
                    name: updatedTask,
                  },
                });
              setEdit((prevState) => !prevState);
            }}
          >
            OK
          </Button>
        </label>
      )}
    </TodoWrapper>
  );
};

export default Todo;
