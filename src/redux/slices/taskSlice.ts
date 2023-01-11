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
  },
});

export const { addTask, removeTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
