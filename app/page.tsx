"use client";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto mt-8 bg-white p-8 rounded-t-2xl shadow-lg min-h-screen items-center">
      <div className=" container relative bg-slate-500 rounded-xl min-h-[800px] flex flex-col items-center">
        <p className="text-[#FFFFFF] text-7xl ml-3 font-semibold my-10">
          {" "}
          The Yrellow{" "}
        </p>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
