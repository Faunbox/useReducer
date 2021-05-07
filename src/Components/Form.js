import React, { useState, useReducer } from "react";
import { ACTIONS, reducer } from "../Global/Reducer";
import Todo from "./Todo";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import firebase from "../firebase";

const WrapperForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 20px 0;
`;

const Input = styled.input`
  height: 4rem;
  width: auto;
  border: 1px solid black;
`;

const Button = styled.button`
  margin: 0 10px;
  height: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const Form = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
  }
  return (
    <>
      <WrapperForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          placeholder="tekst dłuższy jak 3 znaki"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() =>
            name.length >= 3 &&
            dispatch({ type: ACTIONS.NEW_TODO, payload: { name: name } })
          }
        >
          Add new task
        </Button>
      </WrapperForm>
      <Wrapper>
        {todos.map((todo) => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
      </Wrapper>
    </>
  );
};

export default Form;
