import { Dimensions, NativeModules, PixelRatio, Platform, Linking } from "react-native";
// eslint-disable-next-line import/no-unresolved
// import { openInbox } from 'react-native-email-link';
// import fs from 'react-native-fs';

import Config from "./config";

const { width, height } = Dimensions.get("window");

const deviceSize = { width, height };

// number is width of figma screen
const deviceSizeScale = width / Config.figmaComponentWidth < 1 ? 1 : width / Config.figmaComponentWidth;

// scale fixed value value for bigger screens
const scaleNumber = (n = 1) => n * deviceSizeScale;
// if (Config.isDev) {
//   console.groupCollapsed('Device');
//   console.log('deviceSize', deviceSize);
//   console.log('deviceSizeScale', deviceSizeScale);
//   console.groupEnd();
// }
/* if is an ios device */
const isIOS: boolean = Platform.OS === "ios";

/* if is an android device */
const isAndroid: boolean = Platform.OS === "android";

/* if is an iPhoneX device */
function isIPhoneX() {
  // const hasNotch = isIOS &&  StatusBar.currentHeight > 24; test

  // react-native-extra-dimensions-android
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

const isSmall: boolean = width < 370;
// width 320 568

/* get pixel density */
const pixelDensity = PixelRatio.get();
// small screen is an 4" android or an iPhone SE or similar
const isSmallSCreen = pixelDensity < (isIOS ? 2.1 : 2);

/* get font scale */
const FontScale = PixelRatio.getFontScale();

const getSysLang = () => {
  const l =
    (
      (Platform.OS === "ios"
        ? NativeModules?.SettingsManager?.settings?.NSLanguages[0]
        : NativeModules?.I18nManager?.localeIdentifier) || "en"
    ).substring(0, 2) || "en";

  return l === "en" ? l : "en";
};

const openUrl = async (url: string) => {
  return Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
      console.log(`Can't handle ${url}`);
      return { error: `Can't handle ${url}` };
    })
    .catch(err => console.error(`An error occurred with ${url}`, { err }));
};

// const openEmail = () => openInbox();

// type encodingType = 'utf8' | 'ascii' | 'base64';

// const saveFile = async (filePath: string, contents: string, encoding: encodingType = 'base64'): Promise<boolean> => {
//   if (__DEV__) console.log('saveFile', filePath, 'contents', !!contents, encoding);
//   return fs
//     .writeFile(filePath, contents, encoding)
//     .then(() => true)
//     .catch(err => {
//       console.log('err', err);
//       return false;
//     });
// };

const DeviceUtils = {
  // saveFile,
  deviceSize,
  deviceSizeScale,
  scaleNumber,
  isIOS,
  isAndroid,
  isSmall,
  pixelDensity,
  isSmallSCreen,
  FontScale,
  getSysLang,
  openUrl,
  isIPhoneX,
  // openEmail,
};
export default DeviceUtils;
