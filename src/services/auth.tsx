import { post } from "src/services/fetch";
import { ILogInParams } from "src/types/api";

export const logIn = (body: ILogInParams) => {
  return post("/login", body);
};

export const refreshToken = () => {
  return post("/refreshToken", {}, true);
};

const AuthApi = {
  logIn,
};
export default AuthApi;
