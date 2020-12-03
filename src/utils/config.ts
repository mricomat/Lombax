import RNConfig from "react-native-config";

// APPLICATION_ID
// BUILD_TYPE
// DEBUG
// FLAVOR
// VERSION_CODE
// VERSION_NAME

const Config = {
  ...RNConfig,
  isDev: RNConfig.ENV === "DEV",
  isStage: RNConfig.ENV === "STAGE",
  isPro: RNConfig.ENV === "PRODUCTION",
  apiUrl: `https://api.igdb.com/v4`,
  tokenUrl: `https://id.twitch.tv/oauth2/token`,
  imageUrl: `https://images.igdb.com/igdb/image/upload`,
  clientId: "wlakph670srij9zlzw1lnyan72c3ft",
  clientSecret: "2b7wgrj4vef7hw8o0srkpba2id4hie",
  printLog: RNConfig.PRINT_LOG ?? __DEV__,
  isExternalDebugger: !!(global?.performance && global?.origin),
  appId: RNConfig.APPLICATION_ID || "",
  // other custom values
  figmaComponentWidth: 375, // figma screen width
  // const app values
  paginationNumber: 30,
  sessionMinutes: 15,
  retries: 3,
};
if (__DEV__) {
  console.groupCollapsed("RNConfig");
  console.log(RNConfig);
  console.groupEnd();
  console.groupCollapsed("Config");
  console.log(Config);
  console.groupEnd();
}

export default Config;
