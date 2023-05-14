import { ReactNode, createContext, useState } from "react";

interface TaskCycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  endDate?: Date;
  stopDate?: Date;
}

interface TaskContextType {
  taskCycles: Array<TaskCycle>;
  activeTask: TaskCycle | undefined;
  activeTaskId: string | null;
  secondsPassed: number;
  setSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTaskAsFinished: () => void;
  handleCreateNewTaskCycle: (data: CreateNewTaskCycle) => void;
  handleStopTaskCycle: () => void;
}

interface CreateNewTaskCycle {
  task: string;
  duration: number;
}

export const TaskContext = createContext({} as TaskContextType);

interface TaskContextProviderProps {
  children: ReactNode;
}

function TaskContextProvider(props: TaskContextProviderProps) {
  const { children } = props;
  const [taskCycles, setTaskCycles] = useState<Array<TaskCycle>>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [secondsPassed, setSecondsPassed] = useState<number>(0);

  const activeTask = taskCycles.find(
    (taskCycle) => taskCycle.id === activeTaskId
  );

  const handleCreateNewTaskCycle = (data: CreateNewTaskCycle) => {
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

    // reset();
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

  return (
    <TaskContext.Provider
      value={{
        taskCycles,
        activeTask,
        activeTaskId,
        setCurrentTaskAsFinished,
        secondsPassed,
        setSecondsPassed,
        handleCreateNewTaskCycle,
        handleStopTaskCycle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
