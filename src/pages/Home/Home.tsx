import { useEffect, useState } from "react";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";

import {
  Colon,
  DurationInput,
  FormContainer,
  HomeContainer,
  StartButtonContainer,
  StopButtonContainer,
  TaskInput,
  TimerContainer,
} from "./Home.styles";

const newTaskValidationSchema = z.object({
  task: z.string().min(1, "Give your task a name"),
  duration: z
    .number()
    .min(1, "Duration cannot be shorter than 5 minutes")
    .max(60, "Duration cannot be longer than 60 minutes"),
});

type TaskSchema = z.infer<typeof newTaskValidationSchema>;

interface TaskCycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  endDate?: Date;
  stopDate?: Date;
}

function Home() {
  const [taskCycles, setTaskCycles] = useState<Array<TaskCycle>>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState<number>(0);
  const { register, handleSubmit, watch, reset } = useForm<TaskSchema>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: "",
      duration: 25,
    },
  });

  const activeTask = taskCycles.find(
    (taskCycle) => taskCycle.id === activeTaskId
  );
  const durationInSeconds = activeTask ? activeTask.duration * 60 : 0;
  const currentSeconds = activeTask ? durationInSeconds - secondsPassed : 0;
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;

  const minutesCountdown = String(minutes).padStart(2, "0");
  const secondsCountdown = String(seconds).padStart(2, "0");

  const task = watch("task");
  const isSubmitDisabled = !task;

  useEffect(() => {
    let interval: number;
    if (activeTask) {
      interval = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeTask.startDate
        );
        if (diffInSeconds >= durationInSeconds) {
          setTaskCycles((prevTaskCycles) =>
            prevTaskCycles.map((task) => {
              if (task.id === activeTaskId) {
                return { ...task, endDate: new Date() };
              } else {
                return task;
              }
            })
          );
          setSecondsPassed(durationInSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(diffInSeconds);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeTask, durationInSeconds, activeTaskId]);

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

  useEffect(() => {
    if (activeTask) {
      document.title = `${activeTask.task} - ${minutesCountdown}:${secondsCountdown}`;
    }
  }, [activeTask, minutesCountdown, secondsCountdown]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTaskCycle)}>
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
            min={1}
            max={60}
            disabled={!!activeTask}
            {...register("duration", { required: true, valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
        <TimerContainer>
          <span>{minutesCountdown[0]}</span>
          <span>{minutesCountdown[1]}</span>
          <Colon>:</Colon>
          <span>{secondsCountdown[0]}</span>
          <span>{secondsCountdown[1]}</span>
        </TimerContainer>
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
