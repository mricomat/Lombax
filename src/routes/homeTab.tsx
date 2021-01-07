import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "src/components/home-tab";
import FeedScreen from "src/screens/feed";
import SearchScreen from "src/screens/search";
import ReviewsScreen from "src/screens/reviews";
import ProfileStack from "src/routes/profile";
import SoonScreen from "src/screens/soon";

import { routeNames } from "src/hooks/use-navigation";

const HomeTabStack = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabStack.Navigator
      backBehavior="none"
      initialRouteName={routeNames.Feed}
      tabBar={props => <HomeTab {...props} />}
    >
      <HomeTabStack.Screen name="Soon" component={SoonScreen} />
      <HomeTabStack.Screen name="Search" component={SearchScreen} />
      <HomeTabStack.Screen name="Feed" component={FeedScreen} />
      <HomeTabStack.Screen name="Reviews" component={ReviewsScreen} />
      <HomeTabStack.Screen name="Profile" component={ProfileStack} />
    </HomeTabStack.Navigator>
  );
};

export default HomeNavigator;
