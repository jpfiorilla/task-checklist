// asked chatgpt for this schema given the requirements
type Task = {
  id: string; // Unique identifier
  title: string; // Task name or description
  completed: boolean; // Whether the task is done
  createdAt: number; // Unix timestamp (ms) for sorting
};
