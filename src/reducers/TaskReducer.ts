import { produce } from "immer";

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
      return produce(state, (draftState) => {
        draftState.taskCycles.push(action.payload.newTask);
        draftState.activeTaskId = action.payload.newTask.id;
      });
    case TaskCycleActionTypes.STOP_TASK_CYCLE: {
      const taskIndex = state.taskCycles.findIndex(
        (task) => task.id === state.activeTaskId
      );
      if (taskIndex < 0) {
        return state;
      }
      return produce(state, (draftState) => {
        draftState.activeTaskId = null;
        draftState.taskCycles[taskIndex].stopDate = new Date();
      });
    }
    case TaskCycleActionTypes.SET_TASK_AS_DONE: {
      const taskIndex = state.taskCycles.findIndex(
        (task) => task.id === state.activeTaskId
      );
      if (taskIndex < 0) {
        return state;
      }
      return produce(state, (draftState) => {
        draftState.activeTaskId = null;
        draftState.taskCycles[taskIndex].endDate = new Date();
      });
    }
    default:
      throw new Error();
  }
}
