"use client";

import { useEffect, useState } from "react";
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

const STORAGE_KEY = "task-tracker-tasks";

// i wrote this initially, then had chatGPT make a version that hydrates with local state
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null); // null = not ready

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored) as Task[]);
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleCreateTask = (data: Partial<Task>) => {
    const newTask: Task = {
      title: "",
      ...data,
      completed: false,
      createdAt: Date.now(),
      id: crypto.randomUUID(),
    };
    setTasks((prev) => [...(prev ?? []), newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      (prev) =>
        prev?.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ) ?? null
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev?.filter((task) => task.id !== id) ?? []);
  };

  return {
    onCreateTask: handleCreateTask,
    onDeleteTask: handleDeleteTask,
    onToggleTask: handleToggleTask,
    tasks: tasks ?? [],
  };
};

export default function Home() {
  const { onCreateTask, onDeleteTask, onToggleTask, tasks } = useTasks();

  return (
    // asked chatgpt for mui boilerplate here
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1>TaskTracker</h1>
          <Form onCreateTask={onCreateTask} />
          <TaskList
            onDeleteTask={onDeleteTask}
            onToggleTask={onToggleTask}
            tasks={tasks}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}
