import { ReactNode, createContext, useReducer, useState } from "react";
import taskReducer, {
  TaskCycle,
  TaskCycleAction,
  TaskCycleActionTypes,
  TaskCycleState,
  initialState,
} from "../reducers/TaskReducer";

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
  const [state, dispatch] = useReducer<
    (state: TaskCycleState, action: TaskCycleAction) => TaskCycleState
  >(taskReducer, { ...initialState });
  const { taskCycles, activeTaskId } = state;
  const [secondsPassed, setSecondsPassed] = useState<number>(0);

  const activeTask = taskCycles.find(
    (taskCycle) => taskCycle.id === activeTaskId
  );

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
