import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import taskReducer, {
  TaskCycle,
  TaskCycleActionTypes,
  TaskCycleState,
  initialState,
} from "../reducers/TaskReducer";
import useLocalStorage from "../hooks/useLocalStorage";
import { differenceInSeconds, set } from "date-fns";

interface TaskContextType {
  taskCycles: Array<TaskCycle>;
  activeTask: TaskCycle | undefined;
  activeTaskId: string | null;
  secondsPassed: number;
  setSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTaskAsDone: () => void;
  createNewTaskCycle: (data: CreateNewTaskCycle) => void;
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
  const [storedTaskCyclesValue, setStoredTaskCyclesValue] = useLocalStorage({
    key: "@pomodoro-timer-task-cycles-1.0.0",
    initialValue: initialState as TaskCycleState,
  });
  const [state, dispatch] = useReducer(
    taskReducer,
    {
      ...initialState,
    },
    (initialState) => {
      if (storedTaskCyclesValue) {
        return storedTaskCyclesValue;
      }
      return initialState;
    }
  );
  const { taskCycles, activeTaskId } = state;

  const activeTask = taskCycles.find(
    (taskCycle) => taskCycle.id === activeTaskId
  );

  const [secondsPassed, setSecondsPassed] = useState<number>(() => {
    if (activeTask) {
      return differenceInSeconds(new Date(), new Date(activeTask.startDate));
    }
    return 0;
  });

  const createNewTaskCycle = (data: CreateNewTaskCycle) => {
    const taskId = String(new Date().getTime());

    const newTask: TaskCycle = {
      id: taskId,
      task: data.task,
      duration: data.duration,
      startDate: new Date(),
    };

    dispatch({
      type: TaskCycleActionTypes.CREATE_NEW_TASK_CYCLE,
      payload: { newTask },
    });
  };

  const handleStopTaskCycle = () => {
    dispatch({ type: TaskCycleActionTypes.STOP_TASK_CYCLE });
  };

  const setCurrentTaskAsDone = () => {
    dispatch({ type: TaskCycleActionTypes.SET_TASK_AS_DONE });
  };

  useEffect(() => {
    setStoredTaskCyclesValue(state);
  }, [state, setStoredTaskCyclesValue]);

  return (
    <TaskContext.Provider
      value={{
        taskCycles,
        activeTask,
        activeTaskId,
        setCurrentTaskAsDone,
        secondsPassed,
        setSecondsPassed,
        createNewTaskCycle,
        handleStopTaskCycle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
