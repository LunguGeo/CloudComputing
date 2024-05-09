"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";
import Link from 'next/link';


type Todo ={
  _id: string,
  text: string,
  completed: boolean
}

export default function Home({}) {
  const [isLoading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null> (null);

  useEffect(()=>{
    fetch('https://cloud-computing-lovat.vercel.app/api/todo')
    .then((res)=>res.json())
    .then((data)=>{
      setTodos(data);
      setLoading(false)
    })
  },[]);

  
  const addTodo = async()=>{
    if(!newTodoText) return;
    const responde = await fetch("https://cloud-computing-lovat.vercel.app/api/todo",{
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
  };

  const handleEdit =(todo:Todo)=>{
    setEditTodo(todo)
  }

  const handleSave = async()=> {
    if (!editTodo) return;

    const response = await fetch("https://cloud-computing-lovat.vercel.app/api/todo",{
      method: "PUT",
      body: JSON.stringify({
        id: editTodo._id,
        text: editTodo.text,
        completed: editTodo.completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200){
      setTodos(
        todos.map((todo: Todo)=>
          todo._id === editTodo._id ? {...todo, text: editTodo.text} : todo 
        )
      );
      setEditTodo(null);
    }
  };

  const deleteTodo = async(id:string)=>{
    const response = await fetch("https://cloud-computing-lovat.vercel.app/api/todo",{
      method: "DELETE",
      body: JSON.stringify({id}),
      headers:  {
        "Content-Type": "application/json",
      },
    });
    if(response.status===200){
      setTodos(todos.filter((todo: Todo) => todo._id !== id));
    }
};

const toggleTodo = async(id: string, completed: boolean, text: string) =>{
  const response = await fetch("https://cloud-computing-lovat.vercel.app/api/todo",{
      method: "PUT",
      body: JSON.stringify({id, completed: !completed, text}),
      headers:  {
        "Content-Type": "application/json",
      },
    });
    if(response.status===200){
      setTodos(todos.map((todo: Todo) => todo._id == id ? {...todo, completed: !completed} : todo));
    }
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
        value={editTodo.text!}
        onChange={(e)=> setEditTodo({...editTodo, text: e.target.value})}
        />
        <button onClick={handleSave} className="bg-purple-800 px-6 py-2 rounded-lg my-7 text-yellow-400 text-lg uppercase font-semibold ">Save</button>
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
        <button onClick={addTodo} className="bg-purple-800 px-6 py-2 rounded-lg my-7 text-yellow-400 text-lg uppercase font-semibold ">Add Todo</button>
        </>
        )}
      </div>
      <ul className="sm:w-9/12 lg:w-5/12 w-full px-4 flex-col justify-center items-centermy-6 py-6">
        {isLoading && (
          <p className="text-pink-600 text-2xl italic my-10">
            Loading...
          </p>
        )}
        {!isLoading && todos.length==0?(
          <div className="text-pink-600 text-2xl italic my-10">
            (No todos present in the list)
          </div>
        ):(
          <>
          {!isLoading && todos && todos.map((todo: Todo)=>(
            <li key={todo._id}
            className="bg-purple-900 px-6 py-5 rounded-lg my-3 hover:text-green-400 text-lg w-full flex justify-between items-start">
              <div className="flex justify-start items-start w-8/12">
                <input type="checkbox"
                className="w-5 h-5 cursor-pointermt-1"
                checked={todo.completed}
                onClick = {()=> toggleTodo(todo._id, todo.completed, todo.text)}
                />
                <span className={`px-4 w-full text-yellow-500 ${todo.completed ? 'line-through' : 'list-none'}`}>
                  {todo.text}
                </span>
              </div>
              <div className="w-4/12 md:w-3/12">
                <button onClick = {()=>handleEdit(todo)} className="text-sky-400 uppercase md:text-base text-sm px-3 hover:text-sky-600">EDIT</button>
                <button onClick={()=>deleteTodo(todo._id)} className="text-pink-400 uppercase md:text-base text-sm px-3 hover:text-pink-600">DELETE</button>
              </div>
            </li>
          ))}
          </>
        )}
      </ul>
    </div>
    <Link href="/form">
        <button className="bg-purple-600 px-6 py-3 rounded-lg my-7 text-white text-lg uppercase font-semibold hover:bg-purple-700">
          Go to Form
        </button>
    </Link>
   </div>
  );
}
