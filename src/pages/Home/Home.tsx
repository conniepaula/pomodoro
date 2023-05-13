import { PlayIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ButtonContainer,
  Colon,
  DurationInput,
  FormContainer,
  HomeContainer,
  TaskInput,
  TimerContainer,
} from "./Home.styles";

const newTaskValidationSchema = z.object({
  task: z.string().min(1, "Give your task a name"),
  duration: z
    .number()
    .min(5, "Duration cannot be shorter than 5 minutes")
    .max(60, "Duration cannot be longer than 60 minutes"),
});

type TaskSchema = z.infer<typeof newTaskValidationSchema>;

function Home() {
  const { register, handleSubmit, watch, reset } = useForm<TaskSchema>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: "",
      duration: 25,
    },
  });
  const handleCreateNewTask = (data: TaskSchema) => {
    console.log(data);
    reset();
  };
  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormContainer>
          <label htmlFor="task">I'll work on</label>
          <TaskInput
            id="task"
            placeholder="Give your task a title"
            list="task-suggestions"
            {...register("task", { required: true })}
          />
          <datalist id="task-suggestions">
            <option value="Check Akiflow" />
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
            {...register("duration", { required: true, valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Colon>:</Colon>
          <span>0</span>
          <span>0</span>
        </TimerContainer>
        <ButtonContainer type="submit" disabled={isSubmitDisabled}>
          <PlayIcon /> Start Task
        </ButtonContainer>
      </form>
    </HomeContainer>
  );
}

export default Home;
