import { Dispatch, SetStateAction } from "react";
import { commonListTodo } from "../../config/types/commonListTodo";
export interface ViewAndEditNoteAndTodoModalInterface {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  selectedData: commonListTodo | undefined;
  setSelectedData: Dispatch<SetStateAction<commonListTodo | undefined>>;
}
