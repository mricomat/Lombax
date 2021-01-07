import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { AppState, AppStateStatus } from "react-native";

import { RootContext } from "src/hooks/use-context";
import { routeNames } from "src/hooks/use-navigation";
import Home from "src/routes/home";
import GameDetailScreen from "src/screens/gameDetail";
import PlayerScreen from "src/screens/player";
import ReviewDetailScreen from "src/screens/reviews/reviewDetail";
import NewReviewScreen from "src/screens/reviews/newReview";
import RegisterScreen from "src/screens/auth/register";
import MosaicScreen from "src/screens/mosaic";
import storange from "src/utils/storange";
import { langType } from "src/types/context";
import { IUser } from "src/types/api";
import { getToken } from "src/services/fetch";

// crash if go back from signup to root
enableScreens();
const RootStack = createStackNavigator();

const DefaultOptions = { headerShown: false };

// app root, modals here
const App = () => {
  const user = useState<IUser>({} as IUser);
  const langState = useState<langType>("es");
  const [appState, setAppState] = useState<AppStateStatus>("active");

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    initData();
    return () => AppState.addEventListener("change", handleAppStateChange);
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState === "active" && nextAppState.match(/inactive|background/)) {
      storange.set(storange.keys.context, JSON.stringify({ lang: langState[0] }));
      setAppState(nextAppState);
    } else if (nextAppState === "active" && appState.match(/inactive|background/)) {
      storange.remove(storange.keys.context);
      setAppState(nextAppState);
    }
  };

  const initData = async () => {
    const resToken = getToken();
    const res = await storange.get(storange.keys.context);
    let restoredContext = false;

    if (res) {
      // get all keys from saved context and restore in current
      const { lang } = JSON.parse(res);
      langState[1](lang);
      console.log("restored lang", lang); // TODO LOGGER
      if (lang) restoredContext = true;

      let isSigned = false;
      const TokenRestored = await resToken;
      if (restoredContext && TokenRestored) {
        console.log("TokenRestored", !!TokenRestored);
        // Refresh toker to get user
      }
    }
  };

  return (
    <RootContext.Provider value={{ langState, user }}>
      <RootStack.Navigator>
        <RootStack.Screen name={routeNames.HomeStack} component={Home} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.GameDetail} component={GameDetailScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.MosaicScreen} component={MosaicScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.ReviewDetail} component={ReviewDetailScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.NewReview} component={NewReviewScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.PlayerScreen} component={PlayerScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.RegisterScreen} component={RegisterScreen} options={DefaultOptions} />
      </RootStack.Navigator>
    </RootContext.Provider>
  );
};

export default App;
