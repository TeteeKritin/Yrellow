"use client";
import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto mt-8 bg-white p-8 rounded-t-2xl shadow-lg min-h-screen items-center">
      <div className=" container relative bg-[#08486E] rounded-xl min-h-[800px]">
        <div className="flex flex-row ">
          <p className="text-[#D9D9D9] mt-3 ml-3">Yrellow Trello</p>
        </div>

        <p className="text-[#FFFFFF] text-2xl ml-3 font-semibold">
          {" "}
          The user name{" "}
        </p>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
