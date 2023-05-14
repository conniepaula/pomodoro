export enum TaskCycleActionTypes {
  CREATE_NEW_TASK_CYCLE = "CREATE_NEW_TASK_CYCLE",
  STOP_TASK_CYCLE = "STOP_TASK_CYCLE",
  SET_TASK_AS_DONE = "SET_TASK_AS_DONE",
}

type Action<ActionType> = {
  type: ActionType;
  payload?: any;
};

export interface TaskCycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  endDate?: Date;
  stopDate?: Date;
}

export type TaskCycleAction = Action<TaskCycleActionTypes>;

export type TaskCycleState = {
  taskCycles: Array<TaskCycle>;
  activeTaskId: string | null;
};

export const initialState: TaskCycleState = {
  taskCycles: [],
  activeTaskId: null,
};

export default function taskReducer(
  state: TaskCycleState,
  action: TaskCycleAction
) {
  switch (action.type) {
    case TaskCycleActionTypes.CREATE_NEW_TASK_CYCLE:
      return {
        ...state,
        taskCycles: [...state.taskCycles, action.payload.newTask],
        activeTaskId: action.payload.newTask.id,
      };
    case TaskCycleActionTypes.STOP_TASK_CYCLE:
      return {
        ...state,
        taskCycles: state.taskCycles.map((task) => {
          if (task.id === state.activeTaskId) {
            return { ...task, stopDate: new Date() };
          } else {
            return task;
          }
        }),
        activeTaskId: null,
      };
    case TaskCycleActionTypes.SET_TASK_AS_DONE:
      return {
        ...state,
        taskCycles: state.taskCycles.map((task) => {
          if (task.id === state.activeTaskId) {
            return { ...task, endDate: new Date() };
          } else {
            return task;
          }
        }),
        activeTaskId: null,
      };
    default:
      throw new Error();
  }
}
