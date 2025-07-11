import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { FormEventHandler, useState } from "react";

type FormProps = {
  onCreateTask: (newTask: Partial<Task>) => void;
};

const Form = ({ onCreateTask }: FormProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // asked chatgpt for this submit handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem("title") as HTMLInputElement;

    const title = input.value;
    if (!title.trim()) return;

    setIsPressed(true);
    onCreateTask({ title });
    form.reset();

    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
      <Input autoFocus fullWidth name="title" placeholder="Create a new task" />
      {/* asked chatgpt on the best way of styling the button; mui-domain/docs alternative */}
      <Button
        className={`transition-transform duration-100 ${
          isPressed ? "scale-95" : ""
        }`}
        color="primary"
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
