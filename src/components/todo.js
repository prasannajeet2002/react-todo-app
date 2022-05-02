import React, { useEffect, useState } from "react";
import "./todo.css";

const getTodos = () => {
  const todoList = localStorage.getItem("myTodoList");

  if (todoList) {
    return JSON.parse(todoList);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState(getTodos());
  const [editedTodoId, setEditedTodoId] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addTodo = () => {
    if (!inputData) {
      alert("Please fill the todo");
    } else if (toggleButton && inputData) {
      setTodos(
        todos.map((currentElement) => {
          if (currentElement.id === editedTodoId) {
            return { ...currentElement, name: inputData };
          }
          return currentElement;
        })
      );
      setInputData("");
      setEditedTodoId(null);
      setToggleButton(false);
    } else {
      const myNewTodo = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setTodos([...todos, myNewTodo]);
      setInputData("");
    }
  };

  const editTodo = (index) => {
    const editTodo = todos.find((currentElement) => {
      return currentElement.id === index;
    });
    setInputData(editTodo.name);
    setEditedTodoId(index);
    setToggleButton(true);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((currentElement) => {
      return currentElement.id !== index;
    });
    setTodos(updatedTodos);
  };

  const removeAll = () => {
    setTodos([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>to-dos</h1>
      <div id="form" className="form">
        <div className="form-control">
          <input
            type="text"
            placeholder="write your to-do here"
            className="input"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            id="input"
            autocomplete="off"
          />
          {toggleButton ? (
            <button className="plus" onClick={addTodo}>
              <i className="far fa-2x fa-edit"></i>
            </button>
          ) : (
            <button className="plus" onClick={addTodo}>
              <i className="fa fa-2x fa-plus"></i>
            </button>
          )}
        </div>
        <ul className="todos" id="todos">
          <div className="onlythis">these are your to-dos</div>
          {todos.map((currentElement) => {
            return (
              <div className="all-todos" key={currentElement.id}>
                <h3>{currentElement.name}</h3>
                <div className="todo-btns">
                  <i
                    className="far fa-2x fa-edit btn1 "
                    onClick={() => editTodo(currentElement.id)}
                  ></i>
                  <i
                    className="far fa-2x fa-trash-alt btn2"
                    onClick={() => deleteTodo(currentElement.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="showitems">
        <button className="all" onClick={removeAll}>
          <span>Remove All</span>
        </button>
      </div>
    </>
  );
};

export default Todo;
