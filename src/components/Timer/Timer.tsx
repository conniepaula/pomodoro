import { useContext, useEffect, useState } from "react";
import { differenceInSeconds, set } from "date-fns";

import { TimerContainer, Colon } from "./Timer.styles";
import { TaskContext } from "../../context/TaskContext";

function Timer() {
  const {
    activeTask,
    activeTaskId,
    setCurrentTaskAsFinished,
    secondsPassed,
    setSecondsPassed,
  } = useContext(TaskContext);
  const durationInSeconds = activeTask ? activeTask.duration * 60 : 0;
  const currentSeconds = activeTask ? durationInSeconds - secondsPassed : 0;
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;

  const minutesCountdown = String(minutes).padStart(2, "0");
  const secondsCountdown = String(seconds).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeTask) {
      interval = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeTask.startDate
        );
        if (diffInSeconds >= durationInSeconds) {
          setCurrentTaskAsFinished();
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
  }, [
    activeTask,
    durationInSeconds,
    activeTaskId,
    setCurrentTaskAsFinished,
    setSecondsPassed,
  ]);

  useEffect(() => {
    if (activeTask) {
      document.title = `${activeTask.task} - ${minutesCountdown}:${secondsCountdown}`;
    }
  }, [activeTask, minutesCountdown, secondsCountdown]);

  return (
    <TimerContainer>
      <span>{minutesCountdown[0]}</span>
      <span>{minutesCountdown[1]}</span>
      <Colon>:</Colon>
      <span>{secondsCountdown[0]}</span>
      <span>{secondsCountdown[1]}</span>
    </TimerContainer>
  );
}

export default Timer;
