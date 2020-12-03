// external navigation actions
import {
  // NavigationProp,
  CommonActions,
  useNavigation,
  NavigationContainerRef,
} from "@react-navigation/native";
// import { CommonActions, StackActions } from '@react-navigation/routers';
// import {Color} from 'csstype';
import {
  StatusBar,
  StatusBarStyle,
  // , StatusBarStyle
} from "react-native";

// import { NavigationProp } from 'react-navigation';
import Config from "src/utils/config";
// https://github.com/react-navigation/react-navigation/issues/1439#issuecomment-340293063

// export enum deepLinkRoutes {}

// export enum modalNames {}

let current: string | number | undefined = "";

const Navigator = {
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
    if (current === routeName) {
      return;
    }
    current = routeName;
    Navigator?.navigation?.dispatch(CommonActions.navigate(routeName, params));
  },

  goBack: () => {
    if (Config.printLog) {
      console.log("goBack");
    }
    current = "";
    Navigator?.navigation?.dispatch(CommonActions.goBack());
  },

  // actions to dispatch

  // if screen is reused
  // push: (routeName: string, params?: object) => {
  //   if (printLog) console.log('navigate', routeName, { params });

  //   Navigator?.navigation?.dispatch(StackActions.push(routeName, params));
  // },

  // pop: (count?: number) => {
  //   if (printLog) console.log('pop', count);
  //   if (current === `pop${count}`) return;
  //   current = `pop${count}`;
  //   Navigator?.navigation?.dispatch(StackActions.pop(count));
  // },

  // popToTop: () => {
  //   if (printLog) console.log('PopToTop');
  //   if (current === 'popToTop') return;
  //   current = 'popToTop';
  //   Navigator?.navigation?.dispatch(StackActions.popToTop());
  // },

  // openDefaultModal: (params?: object) => {
  //   if (printLog) console.log('openModal', { params });
  //   if (current === 'modal') return;
  //   current = 'modal';
  //   Navigator?.navigation?.dispatch(CommonActions.navigate('modalNames.DefaultModal', params));
  // },

  // openModal: (routeName: string, params?: object) => {
  //   if (printLog) console.log('openModal', routeName, { params });
  //   if (current === 'modal-routeName') return;
  //   current = 'modal-routeName';
  //   Navigator?.navigation?.dispatch(CommonActions.navigate('routeName', params));
  // },
};

export default Navigator;

export const useCustomNavigation = () => {
  const navigation = useNavigation();
  const { dispatch } = navigation;

  const goBack = () => {
    if (Config.printLog) {
      console.log("goBack");
    }
    current = "";
    // TODO avoid close app
    dispatch(CommonActions.goBack());
  };

  const navigate = (routeName: string, params?: object) => {
    if (Config.printLog) {
      console.log("navigate", routeName, { params });
    }
    if (current === routeName) {
      return;
    }
    current = routeName;
    dispatch(CommonActions.navigate(routeName, params));
  };

  return { navigation, goBack, navigate, dispatch };
};
