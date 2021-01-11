import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { routeNames } from "src/hooks/use-navigation";
import AnimationUtils from "src/utils/animations";
import RegisterScreen from "src/screens/auth/registerInfo";
import RegisterInterests from "src/screens/auth/registerInterests";
import RegisterAvatar from "src/screens/auth/registerAvatar";

const RegisterStack = createStackNavigator();

const DefaultOptions = {
  headerShown: false,
};

const RegisterNavigator = () => {
  return (
    <RegisterStack.Navigator screenOptions={AnimationUtils.stackOptions}>
      <RegisterStack.Screen name={routeNames.RegisterInfo} component={RegisterScreen} options={DefaultOptions} />
      <RegisterStack.Screen
        name={routeNames.RegisterInterests}
        component={RegisterInterests}
        options={DefaultOptions}
      />
      <RegisterStack.Screen name={routeNames.RegisterAvatar} component={RegisterAvatar} options={DefaultOptions} />
    </RegisterStack.Navigator>
  );
};

export default RegisterNavigator;
