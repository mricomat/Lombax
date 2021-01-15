import { IUser } from "src/types/api";
import Config from "src/utils/config";

const isDebug = __DEV__;

export const defLogin = {
  email: isDebug ? "m3@gmail.com" : "",
  password: isDebug ? "MyCoolPassword1!" : "",
};

export const defInfoRegister = {
  name: isDebug ? "Martin" : "",
  lastName: isDebug ? "Rico Martinez" : "",
  username: isDebug ? "mrico" : "",
  email: isDebug ? "m3@gmail.com" : "",
  birth: isDebug ? "10/09/1993" : "",
  password: isDebug ? "MyCoolPassword1!" : "",
  description: isDebug
    ? `"I am Solaire of Astora, an adherent to the Lord of Sunlight. Now that I am Undead, I have come to this great land, the birthplace of Lord Gwyn, to seek my very own sun!"\n\nSolaire of Astora`
    : "",
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
