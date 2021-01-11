// external navigation actions
import { CommonActions, NavigationContainerRef, useNavigation, StackActions } from "@react-navigation/native";
import { StatusBar, StatusBarStyle } from "react-native";

import Config from "src/utils/config";

// export enum deepLinkRoutes {}

export enum routeNames {
  Splash = "Splash",
  HomeStack = "HomeStack",
  HomeTab = "HomeTab",
  Feed = "Feed",
  GameDetail = "GameDetail",
  ReviewDetail = "ReviewDetail",
  PlayerScreen = "PlayerScreen",
  SearchScreen = "SearchScreen",
  ReviewsScreen = "ReviewsScreen",
  NewReview = "NewReview",
  LoginScreen = "LoginScreen",
  RegisterScreen = "RegisterScreen",
  RegisterInfo = "RegisterInfo",
  RegisterAvatar = "RegisterAvatar",
  RegisterInterests = "RegisterInterests",
  MosaicScreen = "MosaicScreen",
  ProfileScreen = "ProfileScreen",
  SettingsScreen = "SettingsScreen",
}

export enum modalNames {
  NoModal = "NoModal",
}

let current: string | number | undefined = "";
console.log(current);
const setCurrent = (c = "") => {
  current = c;
  if (c) setTimeout(() => setCurrent(), 1000);
};

// TODO unify logic

export const Navigator = {
  navigation: {} as NavigationContainerRef,

  setTopBarStyle: (color, barStyle: StatusBarStyle = "default") => {
    StatusBar.setBarStyle(barStyle);
    StatusBar.setBackgroundColor(color);
  },

  initNavigator: (navigatorRef: any) => {
    Navigator.navigation = navigatorRef;
  },

  navigate: (routeName: string, params?: object) => {
    if (Config.printLog) {
      console.log("navigate", routeName, { params });
    }
    // if (current === routeName) {
    //   return;
    // }
    setCurrent(routeName);
    Navigator?.navigation?.dispatch(CommonActions.navigate(routeName, params));
  },

  goBack: () => {
    if (Config.printLog) {
      console.log("goBack");
    }
    setCurrent();
    Navigator?.navigation?.dispatch(CommonActions.goBack());
  },

  push: (routeName: string, params?: object) => {
    if (Config.printLog) {
      console.log("push", routeName, { params });
    }
    Navigator?.navigation?.dispatch(StackActions.push(routeName, params));
  },

  // initSplash: () => {
  //   Navigator?.navigation?.dispatch(
  //     CommonActions.reset({
  //       index: 1,
  //       routes: [{ name: modalNames.NoModal }],
  //     })
  //   );
  // },

  // showModalError: (props: Partial<IBasicModalProps> = {}) => {
  //   const { unknownError } = getLanguageFile();
  //   Navigator.navigate(modalNames.bottomInfoCard, {
  //     icon: <ErrorSVG />,
  //     title: unknownError,
  //     backgroundColor: colors.error,
  //     ...props,
  //   });
  // },

  // networkError: () => {
  //   const { networkError, networkErrorParagraph } = getLanguageFile();
  //   Navigator.showModalError({ title: networkError, paragraph: networkErrorParagraph });
  // },
};

const useCustomNavigation = () => {
  const navigation = useNavigation();
  const { dispatch } = navigation;

  const goBack = () => {
    if (Config.printLog) {
      console.log("goBack");
    }
    setCurrent();
    // TODO avoid close app
    dispatch(CommonActions.goBack());
  };

  const navigate = (routeName: string, params?: object, key?: any) => {
    if (__DEV__) console.log("navigate", routeName, { params });

    // if (current === routeName) return;

    setCurrent(routeName);
    dispatch(CommonActions.navigate({ name: routeName, params, key }));
  };

  const push = (routeName: string, params?: object) => {
    if (__DEV__) console.log("push", routeName, { params });

    setCurrent(routeName);
    dispatch(StackActions.push(routeName, params));
  };
  // // navigations that requires expecific props
  // const openBottomBasicModal = (props: IBasicModalProps) => {
  //   navigate(modalNames.bottomInfoCard, props);
  // };

  // const openBottomErrorModal = (props: Partial<IBasicModalProps> = {}) => {
  //   const { errors } = getLanguageFiles();
  //   navigate(modalNames.bottomInfoCard, {
  //     icon: <ErrorSVG />,
  //     title: errors.unknownError,
  //     backgroundColor: colors.error,
  //     ...props,
  //   });
  // };

  // const openNetworkErrorModal = () => {
  //   const { errors } = getLanguageFiles();
  //   openBottomErrorModal({ title: errors.networkError, paragraph: errors.networkErrorParagraph });
  // };

  // const openMailModal = (props: Partial<IBasicModalProps> = {}) => {
  //   const { main } = getLanguageFiles();
  //   openBottomErrorModal({
  //     icon: <MailSVG />,
  //     title: main.emailSent,
  //     paragraph: main.emailSentParagraph,
  //     buttonText: main.openEmail,
  //     onPress: DeviceUtils.openEmail,
  //     backgroundColor: colors.info,
  //     ...props,
  //   });
  // };

  // const openWebViewModal = (props: Partial<IWebViewScreen> = {}) => {
  //   navigate(modalNames.WebView, props);
  // };

  const initSplash = () => {
    dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: modalNames.NoModal }],
      })
    );
  };

  return {
    navigation,
    goBack,
    navigate,
    dispatch,
    routeNames,
    modalNames,
    push,
    // openBottomBasicModal,
    initSplash,
    // openBottomErrorModal,
    // openMailModal,
    // openNetworkErrorModal,
    // openWebViewModal,
  };
};
export default useCustomNavigation;
