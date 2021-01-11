import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { routeNames } from "src/hooks/use-navigation";
import HomeTab from "src/routes/homeTab";
import AnimationUtils from "src/utils/animations";

const HomeStack = createStackNavigator();

const DefaultOptions = {
  headerShown: false,
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={AnimationUtils.stackOptions}>
      <HomeStack.Screen name={routeNames.HomeTab} component={HomeTab} options={DefaultOptions} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
