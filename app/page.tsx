"use client"
import Image from "next/image";
import { useState } from "react";
import { text } from "stream/consumers";

type Todo ={
  _id: string,
  text: string | null,
  completed: boolean
}

export default function Home({}) {
  const [isLoading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null> (null);

  const addTodo = async()=>{
    if(!newTodoText) return;
    const responde = await fetch("http://localhost:3000/api",{
      method: 'POST',
      body: JSON.stringify({text: newTodoText}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await responde.json();
    console.log("data", data);
    setTodos([...todos, data]);
    setNewTodoText('')
  }

  return (
   <div className="font-mulish grid lg:place-items place-items-center w-full blue text-purple-500 min-h-screen">
    <div className="flex lg:flex-row flex-col gap-5 lg:justify-start justify-center lg:items-start items-center w-full mx-auto">
      <div className="sm:w-9/12 lg:w-6-12 w-full px-4 lg:my-10 flex flex-col justify-center items-center">
        <h1 className="lg:text-5xl text-3xl py-8 lg:pt-14 uppercase font-mediu text-purple-600">Solve this tasks</h1>
        <h1 className="text-4xl py-8 lg:py-0 lg:pt-4 lg:pb-14 text-yellow-500 ">Todo List</h1>
        {editTodo ? ( 
        <>
        <input 
        className="w-full lg:w-8/12 big-black border corder-yellow-400 py-4 text-xl rounded lg text-purple-400 outline-none px-3"
        type="text"
        />
        <button className="bg-slate-800 px-6 py-2 rounded-lg my-7 text-green-400 text-lg uppercase font-semibold ">Save</button>
        </>
        ) : (
        <>
        <input 
        className="w-full lg:w-8/12 big-black border corder-purple-400 py-4 text-xl rounded lg text-purple-400 outline-none px-3"
        type="text"
        placeholder="Write here..."
        value={ newTodoText}
        onChange={(e)=> setNewTodoText(e.target.value)}
        />
        <button onClick={addTodo} className="bg-slate-800 px-6 py-2 rounded-lg my-7 text-green-400 text-lg uppercase font-semibold ">Add Todo</button>
        </>
        )}
      </div>
    </div>
   </div>
  );
}
