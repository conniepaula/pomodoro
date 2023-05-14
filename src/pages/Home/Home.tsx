import { createContext, useEffect, useState } from "react";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";

import {
  HomeContainer,
  StartButtonContainer,
  StopButtonContainer,
} from "./Home.styles";
import Form from "../../components/Form/Form";
import Timer from "../../components/Timer/Timer";

interface TaskCycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  endDate?: Date;
  stopDate?: Date;
}

interface TaskContextType {
  activeTask: TaskCycle | undefined;
  activeTaskId: string | null;
  secondsPassed: number;
  setSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTaskAsFinished: () => void;
}

export const TaskContext = createContext({} as TaskContextType);

const newTaskValidationSchema = z.object({
  task: z.string().min(1, "Give your task a name"),
  duration: z
    .number()
    .min(1, "Duration cannot be shorter than 5 minutes")
    .max(60, "Duration cannot be longer than 60 minutes"),
});

type TaskSchema = z.infer<typeof newTaskValidationSchema>;

function Home() {
  const [taskCycles, setTaskCycles] = useState<Array<TaskCycle>>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState<number>(0);

  const newTaskCycleForm = useForm<TaskSchema>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: "",
      duration: 25,
    },
  });

  const { handleSubmit, reset, watch } = newTaskCycleForm;

  const activeTask = taskCycles.find(
    (taskCycle) => taskCycle.id === activeTaskId
  );

  const task = watch("task");
  const isSubmitDisabled = !task;

  const handleCreateNewTaskCycle = (data: TaskSchema) => {
    const taskId = String(new Date().getTime());

    const newTaskCycle: TaskCycle = {
      id: taskId,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    };

    setTaskCycles((prevTaskCycles) => [...prevTaskCycles, newTaskCycle]);
    setActiveTaskId(taskId);
    setSecondsPassed(0);

    reset();
  };

  const setCurrentTaskAsFinished = () => {
    setTaskCycles((prevTaskCycles) =>
      prevTaskCycles.map((task) => {
        if (task.id === activeTaskId) {
          return { ...task, endDate: new Date() };
        } else {
          return task;
        }
      })
    );
  };

  const handleStopTaskCycle = () => {
    setTaskCycles((prevTaskCycles) =>
      prevTaskCycles.map((task) => {
        if (task.id === activeTaskId) {
          return { ...task, stopDate: new Date() };
        } else {
          return task;
        }
      })
    );

    setActiveTaskId(null);
  };

  return (
    <TaskContext.Provider
      value={{
        activeTask,
        activeTaskId,
        setCurrentTaskAsFinished,
        secondsPassed,
        setSecondsPassed,
      }}
    >
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
    </TaskContext.Provider>
  );
}

export default Home;
