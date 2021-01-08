import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { routeNames } from "src/hooks/use-navigation";
import AnimationUtils from "src/utils/animations";
import LoginScreen from "src/screens/auth/login";
import ProfileScreen from "src/screens/profile";
import useRootContext from "src/hooks/use-context";

const ProfileStack = createStackNavigator();

const DefaultOptions = {
  headerShown: false,
};

const ProfileNavigator = () => {
  const {
    user: [user],
  } = useRootContext();
  return (
    <ProfileStack.Navigator
      screenOptions={AnimationUtils.stackOptions}
      initialRouteName={user ? routeNames.ProfileScreen : routeNames.LoginScreen}
    >
      <ProfileStack.Screen name={routeNames.LoginScreen} component={LoginScreen} options={DefaultOptions} />
      <ProfileStack.Screen name={routeNames.ProfileScreen} component={ProfileScreen} options={DefaultOptions} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
