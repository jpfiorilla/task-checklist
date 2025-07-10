import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { FormEventHandler } from "react";

type FormProps = {
  onCreateTask: (newTask: Partial<Task>) => void;
};

const Form = ({ onCreateTask }: FormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem("title") as HTMLInputElement;

    const title = input.value;

    onCreateTask({ title });

    form.reset();
  };

  return (
    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
      <Input autoFocus fullWidth name="title" placeholder="Create a new task" />
      <Button color="primary" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Form;
