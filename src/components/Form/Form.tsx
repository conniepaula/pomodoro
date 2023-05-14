import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { DurationInput, FormContainer, TaskInput } from "./Form.styles";
import { TaskContext } from "../../context/TaskContext";

function Form() {
  const { activeTask } = useContext(TaskContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">I'll work on</label>
      <TaskInput
        id="task"
        placeholder="Give your task a title"
        list="task-suggestions"
        disabled={!!activeTask}
        {...register("task", { required: true })}
      />
      <datalist id="task-suggestions">
        <option value="Reply to Discord messages" />
        <option value="Pick Jira tasks for the day" />
      </datalist>
      <label htmlFor="duration">for</label>
      <DurationInput
        id="duration"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeTask}
        {...register("duration", { required: true, valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  );
}

export default Form;
