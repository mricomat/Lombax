import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

import { RootContext } from "src/hooks/use-context";
import { routeNames } from "src/hooks/use-navigation";
import Home from "src/routes/home";
import GameDetailScreen from "src/screens/gameDetail";
import PlayerScreen from "src/screens/player";
import ReviewDetailScreen from "src/screens/reviewDetail";

// crash if go back from signup to root
enableScreens();
const RootStack = createStackNavigator();

const DefaultOptions = { headerShown: false };

// app root, modals here
const App = () => {
  // const [langContext, lang] = useState<langType>('en');

  useEffect(() => {
    //
  }, []);

  return (
    <RootContext.Provider value={{}}>
      <RootStack.Navigator>
        <RootStack.Screen name={routeNames.HomeStack} component={Home} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.GameDetail} component={GameDetailScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.ReviewDetail} component={ReviewDetailScreen} options={DefaultOptions} />
        <RootStack.Screen name={routeNames.PlayerScreen} component={PlayerScreen} options={DefaultOptions} />
      </RootStack.Navigator>
    </RootContext.Provider>
  );
};

export default App;
