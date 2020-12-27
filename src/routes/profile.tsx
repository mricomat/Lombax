import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { routeNames } from "src/hooks/use-navigation";
import AnimationUtils from "src/utils/animations";
import LoginScreen from "src/screens/auth/login";
import ProfileScreen from "src/screens/profile";

const ProfileStack = createStackNavigator();

const DefaultOptions = {
  headerShown: false,
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={AnimationUtils.stackOptions}>
      <ProfileStack.Screen name={routeNames.HomeStack} component={LoginScreen} options={DefaultOptions} />
      <ProfileStack.Screen name={routeNames.ProfileScreen} component={ProfileScreen} options={DefaultOptions} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
