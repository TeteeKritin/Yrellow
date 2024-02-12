"use client";
import React, { useState, useEffect } from "react";
import {
  BsArrowDownSquare,
  BsArrowDownUp,
  BsArrowUpSquare,
  BsBoxArrowDown,
  BsBoxArrowUp,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: number;
  // imageUrl: string;
}

/*Test*/
const TodoList: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState<string>("");
  // const [imageUrl, setImageUrl] = useState("");

  async function fetchAPI() {
    const res = await fetch("https://dummyjson.com/todos");
    const data = await res.json();
    return data;
  }

  const handleInputChange = (text: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(text.target.value);
  };

  const handleTodoAdd = () => {
    if (newTodoText !== "") {
      const newTodo: Todo = {
        id: todos.length + 1,
        text: newTodoText,
        completed: false,
        userId: Date.now(),
        // imageUrl: "",
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

  const handleMoveTodoUp = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > 0) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const handleMoveTodoDown = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index < todos.length - 1) {
      const updatedTodos = [...todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      setTodos(updatedTodos);
    }
  };

  const handleRandomClick = async () => {
    const data = await fetchAPI();

    const randomIndex = Math.floor(Math.random() * data.todos.length);
    const randomTodo = data.todos[randomIndex];

    const newTodo: Todo = {
      id: Date.now(),
      text: randomTodo.todo,
      completed: false,
      userId: randomTodo.userId,
      // imageUrl: "",
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleExportClick = () => {
    const json = JSON.stringify(todos);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newTodos = JSON.parse(content) as Todo[];
        setTodos(newTodos);
      };
      reader.readAsText(file);
    }
  };

  // const handleFileChange = (id: number, file: File | undefined) => {
  //   if (file) {
  //     // Use FileReader to read the file as data URL
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const imageUrl = reader.result as string;
  //       // Update the todo item with the new image URL
  //       const updatedTodos = todos.map((todo) =>
  //         todo.id === id ? { ...todo, imageUrl: imageUrl } : todo
  //       );
  //       setTodos(updatedTodos);
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }
  // };

  const completedTodoCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex flex-col items-center content-center ">
      <div className="flex flex-row justify-center">
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          placeholder="Input your todo"
          className="rounded-2xl placeholder-center text-center h-10 w-30 border border-black mt-1"
        ></input>
        <button
          className="bg-blue-500 p-4 mx-2 rounded-md"
          onClick={handleExportClick}
        >
          <BsBoxArrowUp />
        </button>
        <input
          type="file"
          accept=".json"
          onChange={handleImportClick}
          className="hidden"
          id="fileInput"
        ></input>
        <label
          htmlFor="fileInput"
          className=" cursor-pointer bg-gray-300 p-4 rounded-md"
        >
          <BsBoxArrowDown />
        </label>
      </div>
      {/* <input type="file" onChange={(e) => setImageUrl(e.target.value)}></input> */}
      <div>
        <button
          className="text-black bg-yellow-400 p-3 my-4 rounded-full w-52"
          onClick={handleTodoAdd}
        >
          Add
        </button>
        <button
          onClick={handleRandomClick}
          className="text-black bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-3 my-4 rounded-full w-52 ml-4"
        >
          Magic Button
        </button>
      </div>
      <div className="flex items-center"></div>

      <h1 className="text-white mb-4">
        {}
        {completedTodoCount} / {todos.length} Completed
      </h1>
      <h1></h1>
      <ul className="">
        {todos.map((todo) => (
          <div key={todo.id} className="flex flex-col">
            <li className="bg-yellow-400 text-black rounded-xl w-[500px] py-8 px-24 mb-4 items-center min-w-80 drop-shadow-xl self-center">
              {editTodoId === todo.id ? (
                <div className="flex flex-col">
                  <input
                    className="text-black rounded-xl mb-4 text-center py-3 text-xl"
                    type="text"
                    value={editTodoText}
                    onChange={handleEditChange}
                  ></input>
                  <button
                    className="bg-green-400 w-fit self-center text-white py-2 px-4 rounded-xl"
                    onClick={() => todoUpdater(todo.id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex flex-col absolute left-4 top-2">
                    <button
                      className="mb-1"
                      onClick={() => {
                        handleMoveTodoUp(todo.id);
                      }}
                    >
                      <BsArrowUpSquare />
                    </button>
                    <button
                      onClick={() => {
                        handleMoveTodoDown(todo.id);
                      }}
                    >
                      <BsArrowDownSquare />
                    </button>
                  </div>

                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(todo.id, e.target.files?.[0])
                    }
                    className="border"
                  /> */}
                  <h1 className="text-2xl">{todo.text}</h1>
                  <input
                    className=" absolute top-2 right-3 size-6"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckBox(todo.id)}
                  ></input>

                  <div className="flex">
                    <button
                      className=" absolute left-4 bottom-2"
                      onClick={() => handleEditClick(todo.id, todo.text)}
                    >
                      <BsPencilSquare />
                    </button>
                    <button
                      className="absolute right-4 bottom-2"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <BsTrash color="red" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
