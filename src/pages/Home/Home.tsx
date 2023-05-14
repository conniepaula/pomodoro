import { useContext } from "react";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  HomeContainer,
  StartButtonContainer,
  StopButtonContainer,
} from "./Home.styles";
import Form from "../../components/Form/Form";
import Timer from "../../components/Timer/Timer";
import { TaskContext } from "../../context/TaskContext";

const newTaskValidationSchema = z.object({
  task: z.string().min(1, "Give your task a name"),
  duration: z
    .number()
    .min(1, "Duration cannot be shorter than 5 minutes")
    .max(60, "Duration cannot be longer than 60 minutes"),
});

type TaskSchema = z.infer<typeof newTaskValidationSchema>;

function Home() {
  const { activeTask, createNewTaskCycle, handleStopTaskCycle } =
    useContext(TaskContext);

  const newTaskCycleForm = useForm<TaskSchema>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: "",
      duration: 25,
    },
  });

  const { handleSubmit, reset, watch } = newTaskCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  const handleCreateNewTaskCycle = (data: TaskSchema) => {
    createNewTaskCycle(data);
    reset();
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTaskCycle)}>
        <FormProvider {...newTaskCycleForm}>
          <Form />
        </FormProvider>
        <Timer />
        {activeTask ? (
          <StopButtonContainer type="button" onClick={handleStopTaskCycle}>
            <StopIcon /> Cancel Task
          </StopButtonContainer>
        ) : (
          <StartButtonContainer type="submit" disabled={isSubmitDisabled}>
            <PlayIcon /> Start Task
          </StartButtonContainer>
        )}
      </form>
    </HomeContainer>
  );
}

export default Home;
