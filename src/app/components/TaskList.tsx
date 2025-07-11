import { Checkbox } from "@mui/material";

type TaskListProps = {
  onToggleTask: (id: string) => void;
  tasks: Task[];
};

const TaskList = ({ onToggleTask, tasks }: TaskListProps) => {
  return (
    <div className="grid gap-2 w-full min-w-[600px]">
      {tasks.map((task) => (
        <div
          // chatgpt provided various stitches of this className via different queries
          className="grid grid-cols-[auto_1fr] items-center gap-2 p-3 rounded-md shadow-sm cursor-pointer select-none hover:bg-gray-100 transition w-full"
          key={task.id}
          onClick={() => onToggleTask?.(task.id)}
        >
          {/* chatGPT thought of this readOnly prop; which is not semantic but is the more idiomatic way of using mui */}
          <Checkbox checked={task.completed} readOnly />
          <div
            className={`text-base truncate ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
            title={task.title}
          >
            {task.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
