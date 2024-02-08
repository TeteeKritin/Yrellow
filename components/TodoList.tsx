"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { time } from "console";

// Make a request for a user with a given ID
// axios.get('https://dummyjson.com/todos')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// User can add, modify, delete, check, uncheck, and reorder todo list item.
// The number of completed items and total items are required to display in the app (example format: 3/10).
// A todo list app must have ability to save user data on local machine so they can revisit their own todo list later.
// This todo list app contains one magic button for user when they don’t know what to add in the todo list. They can click this button to generate todo list which needs to be fetched from this API endpoint https://dummyjson.com/todos
// For the UI, you can design it by your own way. Be creative!
// Bonus - There is one optional field for each todo list item which is an image (yeah. user can attach image into a todo list item).

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, settodos] = useState<Todo[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodoText !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        todo: newTodoText,
        completed: false,
        userId: Date.now(),
      };
      settodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <div className="text-white">
      <input
        className="text-black"
        type="text"
        placeholder="Enter your todo"
        value={newTodoText}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add</button>
      <div>
        <ul>
          {todos.map((todo) => (
            <div  key={todo.id} className="container-sm bg-slate-500">
              <li>
                <input type="checkbox" />
                <span >{todo.todo}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
