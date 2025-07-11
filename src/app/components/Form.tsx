import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { ChangeEvent, FormEventHandler, useState } from "react";

type FormProps = {
  onCreateTask: (newTask: Partial<Task>) => void;
};

const Form = ({ onCreateTask }: FormProps) => {
  const [title, setTitle] = useState("");
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // asked chatgpt for this submit handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setIsPressed(true);
    onCreateTask({ title });
    setTitle("");

    setTimeout(() => setIsPressed(false), 150);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
      <Input
        autoFocus
        fullWidth
        name="title"
        onChange={handleChange}
        placeholder="Create a new task"
        value={title}
      />
      {/* asked chatgpt on the best way of styling the button; mui-domain/docs alternative */}
      <Button
        className={`transition-transform duration-100 ${
          isPressed ? "scale-95" : ""
        }`}
        color="primary"
        disabled={!title.trim()}
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
