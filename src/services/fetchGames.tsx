import axios from "axios";

import config from "src/utils/config";

let auth = "";

export const getToken = async () => {
  return await axios
    .post(
      config.tokenUrl,
      {},
      { params: { client_id: config.clientId, client_secret: config.clientSecret, grant_type: "client_credentials" } }
    )
    .then(response => {
      return response.data.access_token;
    })
    .catch(err => console.log(err));
};

export const post = async (endPoint: string, body: any) => {
  if (auth === null || auth === "" || auth === undefined) auth = await getToken();

  const headers = {
    "Client-ID": config.clientId,
    Authorization: `Bearer ${auth}`,
    Accept: "application/json",
  };

  return await axios
    .post(`${config.apiUrl}${endPoint}`, body, { headers })
    .then(response => {
      __DEV__ && console.log(endPoint, response);
      return { error: false, data: response.data, url: endPoint };
    })
    .catch(err => {
      const error = JSON.parse(JSON.stringify(err));
      __DEV__ && console.log(endPoint, error);
      return { error: true, data: error, url: endPoint };
    });
};
