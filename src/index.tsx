import "react-native-gesture-handler";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "react-native";
// import { LogBox } from 'react-native';
// import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from "react-native-safe-area-context";

// import { enableScreens } from 'react-native-screens';

import Navigator from "src/utils/navigation";

import DevMenu from "src/components/utils/dev-menu";
import Router from "src/routes/root";
// import { init } from 'src/utils/language';

// init();
// crash if go back from signup to root enableScreens();
const GlobalStack = createStackNavigator();

const App = (): JSX.Element => {
  const [isLoadedApp, setLoadedApp] = useState(false);
  const [isLoadedNav, setLoadedNav] = useState(false);
  const navRef = useRef<NavigationContainerRef>(null);

  const startChecks = async () => {
    // TODO language? push? going background
    // handle whatever is independent of the navigation
    setLoadedApp(true);
  };

  useEffect(() => {
    StatusBar.setHidden(true);
    startChecks();
  }, []);

  useEffect(() => {
    Navigator.initNavigator(navRef.current);
    setLoadedNav(true);
  }, [navRef]);

  // avoid error
  const Component = (props: any) => <Router isLoaded={isLoadedApp && isLoadedNav} navRef={navRef} {...props} />;

  return (
    <SafeAreaProvider>
      {/* To have access to navigator worldwide */}
      <NavigationContainer ref={navRef}>
        <GlobalStack.Navigator>
          <GlobalStack.Screen
            name="GLOBALROOT"
            component={Component}
            options={{
              headerShown: false,
            }}
          />
        </GlobalStack.Navigator>
        <DevMenu />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
