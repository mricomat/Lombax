import AsyncStorage from "@react-native-async-storage/async-storage";

import config from "src/utils/config";

// https://github.com/react-native-community/async-storage/blob/LEGACY/docs/API.md
// unimplemented
// mergeItem;
// getAllKeys;
// multiGet;
// multiSet;
// multiMerge;
// multiRemove;
// clear;
type ICallbackError = (error?: Error, result?: string) => void;

enum keys {
  token = "TOKEN",
  // userId = 'USER_ID',
  context = "CONTEXT", // to persist, delete on open app
  // rememberUser = 'REMEMBERUSER',
  // rememberFaceTouch = 'REMEMBERFACETOUCH',
  // hasLogged = 'HASLOGGED',
  sessionTime = "SESSION-TIME",
  // rememberSignup = 'REMEMBER-SIGNUP',
}

const set = async (key: string, value: string | boolean | number, callback?: ICallbackError) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value), callback);
    if (config.printLog) console.log("key setted", key, !!value);
    return true;
  } catch (e) {
    console.log("error saving in", key, "value", value, e);
    return false;
  }
};

const get = async (key: string, callback?: ICallbackError): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key, callback);
    if (config.printLog) {
      if (value === null) console.log("no previous value for", key);
      else console.log("key getted", key, value);
    }
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  } catch (e) {
    console.log("error getting", key, e);
    return null;
  }
};

const remove = async (key: string, callback?: ICallbackError) => {
  try {
    await AsyncStorage.removeItem(key, callback);
    if (config.printLog) console.log("key removed", key);
    return true;
  } catch (e) {
    console.log("error deleting key", key, e);
    return false;
  }
};

const Storage = { set, get, remove, keys };

export default Storage;
