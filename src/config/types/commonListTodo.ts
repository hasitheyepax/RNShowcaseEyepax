import { note } from "./note";
import { todos } from "./todos";

export type commonListTodo = {
  itemType: string;
  item: note | todos;
};
