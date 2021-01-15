import axios, { AxiosResponse } from "axios";

import config from "src/utils/config";
import storange from "src/utils/storange";

export interface IRes<T> {
  status: number;
  data: T;
  error: boolean | string;
}

axios.defaults.baseURL = config.lombUrl;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const setToken = (jwt: string) => {
  if (jwt) {
    axios.defaults.headers.common.Authorization = `Token ${jwt}`;
    storange.set(storange.keys.token, `Token ${jwt}`);
  } else deleteToken();
};

export const deleteToken = () => {
  delete axios.defaults.headers.common.Authorization;
  storange.remove(storange.keys.token);
};

export const getAxiosToken = (): string | undefined => axios.defaults.headers.common.Authorization;

export const getToken = async () => {
  const token = getAxiosToken();
  if (token) return token;
  const jwt = await storange.get(storange.keys.token);
  if (jwt) axios.defaults.headers.common.Authorization = jwt;
  return jwt;
};

const checkToken = async () => {
  const token = await getToken();
  return !!token;
};

const checkResponse = async (response: Promise<{ response: AxiosResponse }>): Promise<IRes<any>> => {
  return response
    .then(res => res.response || res)
    .then(res => {
      const body = res;
      console.log(body);
      // if (!res.status && !res.data) {
      //   if (true) console.log("Network error");
      //   Navigator.resetStackTo(routeNames.ErrorScreen);
      //   return { status: 501, data: null, error: "Network" };
      // }

      const { status } = body;
      const { data = {}, errors } = body.data;

      //if (true) console.log("response", body);

      if (errors) {
        // if (true) console.log("response error", errors[0]);
        // if (errors[0].message === "Unauthorized") {
        //   deleteToken();
        //   Navigator.resetStackTo(routeNames.LogIn);
        //   return { status: 403, data, error: "Unauthorized" };
        // }
        // if (errors[0].message === "Error: Identifier or password is wrong") {
        //   deleteToken();
        //   return { status: 500, data, error: "Identifier or password is wrong" };
        // }
        // return { status: 500, data, error: errors[0].message };
      }

      // if (data && data.login && data.login.token) {
      //   const token = data.login.token;
      //   axios.defaults.headers.common.Authorization = token;
      //   setToken(token);
      //   delete data.login.token;
      // }

      return { status, data: body.data, error: status !== 200 };
    })
    .catch(err => {
      console.log("err", err);
      return { status: 500, data: err, error: true };
    });
};

export const post = async (endPoint: string, body: any, auth: boolean = false) => {
  auth && checkToken();
  return checkResponse(axios.post(endPoint, body).catch(e => e));
};

export const put = async (endPoint: string, body: any, auth: boolean = false) => {
  auth && checkToken();
  return checkResponse(axios.put(endPoint, body).catch(e => e));
};

export const get = async (endPoint: string, params: any, auth: boolean = false) => {
  auth && checkToken();
  return checkResponse(axios.get(endPoint, { params }).catch(e => e));
};
