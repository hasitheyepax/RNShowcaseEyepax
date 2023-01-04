import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_KEY } from "../config";

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

export { storeData, getData };
