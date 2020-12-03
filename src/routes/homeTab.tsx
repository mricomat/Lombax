import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "src/components/home-tab";
import FeedScreen from "src/screens/feed";

import { routeNames } from "src/hooks/use-navigation";

const HomeTabStack = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabStack.Navigator
      backBehavior="none"
      initialRouteName={routeNames.Feed}
      tabBar={props => <HomeTab {...props} />}
    >
      <HomeTabStack.Screen name="Soon" component={FeedScreen} />
      <HomeTabStack.Screen name="Search" component={FeedScreen} />
      <HomeTabStack.Screen name="Feed" component={FeedScreen} />
      <HomeTabStack.Screen name="Reviews" component={FeedScreen} />
      <HomeTabStack.Screen name="Profile" component={FeedScreen} />
    </HomeTabStack.Navigator>
  );
};

export default HomeNavigator;
