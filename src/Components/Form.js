import React, { useState, useReducer } from "react";
import { ACTIONS, reducer } from "../Global/Reducer";
import Todo from "./Todo";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import firebase from "../firebase";
import { useAuth } from "../contex/AuthContex";
import { Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";

const WrapperForm = styled.form`
  position: relative;
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

const BootstrapButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 5%;
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
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
  }

  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Nastąpił błąd podczas wylogowywania");
    }
  }
  return (
    <>
      <WrapperForm onSubmit={handleSubmit}>
        {!currentUser ? (
          <BootstrapButton variant="link" href="/logowanie">
            Logowanie
          </BootstrapButton>
        ) : (
          <BootstrapButton variant="link" onClick={handleLogOut}>
            Wyloguj
          </BootstrapButton>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        <Input
          type="text"
          value={name}
          placeholder="tekst dłuższy jak 3 znaki"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
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
