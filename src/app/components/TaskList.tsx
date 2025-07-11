import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskListProps = {
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  tasks: Task[];
};

const TaskList = ({ onDeleteTask, onToggleTask, tasks }: TaskListProps) => {
  return (
    <div className="grid gap-2 w-full min-w-[600px]">
      {tasks
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            // chatgpt provided various stitches of this className via different queries
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-2 p-3 rounded-md shadow-sm cursor-pointer select-none hover:bg-gray-100 transition w-full"
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
            {/* i wrote onDeleteTask then asked chatgpt for this button incl hover/animation behavior */}
            <IconButton
              aria-label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <DeleteIcon color="warning" fontSize="small" />
            </IconButton>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
