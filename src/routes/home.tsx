import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { routeNames } from "src/hooks/use-navigation";
import HomeTab from "src/routes/homeTab";
import AnimationUtils from "src/utils/animations";

const RegisterStack = createStackNavigator();

const DefaultOptions = {
  headerShown: false,
};

const RegisterNavigator = () => {
  return (
    <RegisterStack.Navigator screenOptions={AnimationUtils.stackOptions}>
      <RegisterStack.Screen name={routeNames.HomeStack} component={HomeTab} options={DefaultOptions} />
    </RegisterStack.Navigator>
  );
};

export default RegisterNavigator;
