import { Dispatch, SetStateAction } from "react";
import { commonListTodo } from "../../config/types/commonListTodo";
export interface AddNotesModalInterface {
  addNoteModalVisible: boolean;
  setAddNoteModalVisible: Dispatch<SetStateAction<boolean>>;
  addData: commonListTodo | undefined;
  setAddData: Dispatch<SetStateAction<commonListTodo | undefined>>;
}
