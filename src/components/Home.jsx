import React from "react";
import TodoList from "./TodoList";
import Login from "./Login";

export function Home(props) {
  return <div>{props.isLoggedIn != undefined ? <TodoList /> : <Login />}</div>;
}
