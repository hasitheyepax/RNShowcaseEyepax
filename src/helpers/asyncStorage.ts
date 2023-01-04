import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_KEY } from "../config";
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

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(ASYNC_KEY);
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

export { storeData, getData, addUser, getUsers, clearAsyncStorage };
