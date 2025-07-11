import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import { FormEventHandler } from "react";

type FormProps = {
  onCreateTask: (newTask: Partial<Task>) => void;
};

const Form = ({ onCreateTask }: FormProps) => {
  // asked chatgpt for this submit handler
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
      {/* asked chatgpt on the best way of styling the button; mui-domain/docs alternative */}
      <Button color="primary" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Form;
