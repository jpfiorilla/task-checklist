"use client";

import { useState } from "react";
import { Form, TaskList } from "./components";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const theme = createTheme();

const generateNewTask = (data: Partial<Task>): Task => {
  const id = uuidv4();

  return {
    title: "",
    ...data,
    completed: false,
    createdAt: Number(new Date()),
    id,
  };
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (data: Partial<Task>) => {
    const newTask = generateNewTask(data);
    setTasks((v) => [...v, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((v) =>
      v.map((task) => {
        if (task.id !== id) return task;
        return { ...task, completed: !task.completed };
      })
    );
  };

  return {
    onCreateTask: handleCreateTask,
    onToggleTask: handleToggleTask,
    tasks,
  };
};

export default function Home() {
  const { onCreateTask, onToggleTask, tasks } = useTasks();

  return (
    // asked chatgpt for mui boilerplate here
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1>TaskTracker</h1>
          <Form onCreateTask={onCreateTask} />
          <TaskList onToggleTask={onToggleTask} tasks={tasks} />
        </main>
      </div>
    </ThemeProvider>
  );
}
