import { Dispatch, SetStateAction } from "react";
import { commonListTodo } from "../../config/types/commonListTodo";

export interface AddTodoModalInterface {
  addTodoModalVisible: boolean;
  setAddTodoModalVisible: Dispatch<SetStateAction<boolean>>;
  addData: commonListTodo | undefined;
  setAddData: Dispatch<SetStateAction<commonListTodo | undefined>>;
  refreshScreen: boolean;
  setRefreshScreen: Dispatch<SetStateAction<boolean>>;
}
