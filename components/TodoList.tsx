import { time } from "console";
import { todo } from "node:test";
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: number;
}

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState<string>("");

  const handleInputChange = (text: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(text.target.value);
  };

  const handleTodoAdd = () => {
    if (newTodoText !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
        userId: Date.now(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  const handleEditClick = (id: number, text: string) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleEditChange = (text: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoText(text.target.value);
  };

  const todoUpdater = (id: number) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editTodoText } : todo
    );
    setTodos(updatedTodo);
    setEditTodoId(null);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };

  const handleCheckBox = (id: number) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodo);
  };

  const completedTodoCount = todos.filter((todo) => todo.completed).length;

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="Input your todo"
      ></input>
      <button className="text-white" onClick={handleTodoAdd}>
        Add
      </button>
      <h1 className="text-white">
        {}{completedTodoCount} /{todos.length}
      </h1>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <li className="text-white">
              {editTodoId === todo.id ? (
                <>
                  <input
                    className="text-black"
                    type="text"
                    value={editTodoText}
                    onChange={handleEditChange}
                  ></input>
                  <button onClick={() => todoUpdater(todo.id)}>Save</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button onClick={() => handleEditClick(todo.id, todo.text)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckBox(todo.id)}
                  ></input>
                </>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
