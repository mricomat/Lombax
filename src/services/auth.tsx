import { post, put } from "src/services/fetch";
import { ILogInParams, IUser } from "src/types/api";

export const logIn = (body: ILogInParams) => {
  return post("/login", body);
};

export const refreshToken = () => {
  return post("/refreshToken", {}, true);
};

export const registerCheck = (email: string, username: string) => {
  return post("/users/registerCheck", { email, username });
};

export const register = (user: IUser) => {
  return post("/users", user);
};

export const updateUser = (user: any) => {
  return put("/user", user);
};

export const uploadRegisterImages = (files: FormData) => {
  return post("/multipleUpload", files);
};

const AuthApi = {
  logIn,
};
export default AuthApi;
