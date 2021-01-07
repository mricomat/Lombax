import { post } from "src/services/fetch";
import { ILogInParams } from "src/types/api";

export const logIn = (body: ILogInParams) => {
  return post("/login", body);
};

const AuthApi = {
  logIn,
};
export default AuthApi;
