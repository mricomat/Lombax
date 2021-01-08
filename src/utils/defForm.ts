import { IUser } from "src/types/api";
import Config from "src/utils/config";

const isDebug = true;

export const defLogin = {
  email: isDebug ? "m2@gmail.com" : "",
  password: isDebug ? "shadow1973" : "",
};

export const defInfoRegister = {
  name: isDebug ? "Martin" : "",
  lastName: isDebug ? "Rico Martinez" : "",
  username: isDebug ? "mrico" : "",
  email: isDebug ? "m2@gmail.com" : "",
  birth: isDebug ? "" : "",
  password: isDebug ? "MyCoolPassword1!" : "",
  confirmPassword: isDebug ? "MyCoolPassword1!" : "",
};

export const defUser: IUser = {
  id: "",
  name: "",
  email: "",
  username: "",
  token: "",
  summary: "",
  coverId: "",
  backgroundId: "",
  interests: [],
  favorites: [],
  followers: [],
  following: [],
  reviews: [],
  gamesFeels: [],
  diary: [],
};
