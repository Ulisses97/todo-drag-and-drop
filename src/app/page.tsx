"use client";

import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { Task } from "./components";
const { v4: uuidv4 } = require("uuid");

const initialTasks = [
  {
    id: uuidv4(),
    name: "Comprar pão",
  },
  {
    id: uuidv4(),
    name: "Encher pneu do carro",
  },
  {
    id: uuidv4(),
    name: "Estudar React",
  },
];

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

  function reOrderTasks<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result: DropResult) {
    console.log("result", typeof result);
    if (!result.destination) return;

    const items = reOrderTasks(
      tasks,
      result.source.index,
      result.destination.index
    );
    setTasks(items);
  }

  function handleAddTask() {
    if (newTask === "") return;

    const newTaskObject = {
      id: uuidv4(),
      name: newTask,
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  }

  function handleDeleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <main className="bg-[#469371] h-screen flex justify-center overflow-hidden">
      <section className="bg-[#FAF5EF] w-full max-w-[968px] pb-12 px-5 sm:px-[44px] rounded-t-[38px] mt-[100px] mx-4 flex flex-col">
        <h1 className=" text-4xl md:text-6xl border-b-4 border-[#FFAC48] text-[#E87848] mt-7 inline-block">
          Tarefas
        </h1>
        <form className="mt-10">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Escreva sua nova tarefa"
              className="border-2 border-black w-full bg-transparent text-sm md:text-2xl px-3 py-2 "
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="text-sm md:text-2xl  bg-[#E87848]  px-2 sm:px-5 py-[10px] hover:bg-[#ff8754] transition-colors"
              onClick={handleAddTask}
              type="button"
            >
              Adicionar
            </button>
          </div>
        </form>

        <nav className="mt-5 overflow-y-auto flex-1">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" type="list" direction="vertical">
              {(provided) => (
                <ul
                  className="flex flex-col gap-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      deleteTask={handleDeleteTask}
                    />
                  ))}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </nav>
      </section>
    </main>
  );
}
