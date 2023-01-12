import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_KEY, NOTE_KEY, TODO_KEY } from "../config";
import { note } from "../config/types/note";
import { todos } from "../config/types/todos";
import { user } from "../config/types/user";

const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(ASYNC_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(ASYNC_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeNoteData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(NOTE_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getNoteData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const storeTodoData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(TODO_KEY, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getTodoData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODO_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getUsers = async (): Promise<[user] | null> => {
  const data = await getData();

  if (data) {
    const { users } = data;
    return users;
  } else return null;
};

const addUser = async (user: user) => {
  const users = await getUsers();
  if (!users) {
    const dataSet = {
      users: [user],
    };
    await storeData(dataSet);
  } else {
    const dataSet = {
      users: [...users, user],
    };
    await storeData(dataSet);
  }
};

const getNotes = async (): Promise<[note] | null> => {
  const data = await getNoteData();
  if (data) {
    const { notes } = data;
    return notes;
  } else return null;
};

const addNote = async (note: note) => {
  const notes = await getNotes();
  if (!notes) {
    const dataSet = {
      notes: [note],
    };
    await storeNoteData(dataSet);
  } else {
    const dataSet = {
      notes: [...notes, note],
    };
    await storeNoteData(dataSet);
  }
};

const getTodos = async (): Promise<[todos] | null> => {
  const data = await getTodoData();

  if (data) {
    const { todos } = data;
    return todos;
  } else return null;
};

const addTodo = async (todo: todos) => {
  const todos = await getTodos();
  if (!todos) {
    const dataSet = {
      todos: [todo],
    };
    await storeTodoData(dataSet);
  } else {
    const dataSet = {
      todos: [...todos, todo],
    };
    await storeTodoData(dataSet);
  }
};
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(ASYNC_KEY);
    await AsyncStorage.removeItem(NOTE_KEY);
    await AsyncStorage.removeItem(TODO_KEY);
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

export {
  storeData,
  getData,
  addUser,
  getUsers,
  clearAsyncStorage,
  getNotes,
  addNote,
  getTodos,
  addTodo,
};
