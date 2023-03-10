import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localTask } from "../../config/types/localTask";
import { RootState } from "../store";

export interface TaskState {
  tasks: localTask[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<localTask>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<localTask>) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
    },
    updateTask: (state, action: PayloadAction<localTask>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
          task.description = action.payload.description;
        }
      });
    },
    markTaskDone: (state, action: PayloadAction<localTask>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.completedTimestamp = action.payload.completedTimestamp;
          task.completed = action.payload.completed;
        }
      });
    },
    markTaskUndone: (state, action: PayloadAction<localTask>) => {
      state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          task.completedTimestamp = undefined;
          task.completed = false;
        }
      });
    },
  },
});

export const { addTask, removeTask, updateTask, markTaskDone, markTaskUndone } =
  taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
