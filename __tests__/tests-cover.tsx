// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// const Stack = createStackNavigator();
// TODO add navigation
const TestCover = ({ component }) => {
  return (
    // <NavigationContainer>
    <SafeAreaProvider>
      {component}
      {/* <Stack.Navigator>
        <Stack.Screen name="MockedScreen" component={() => component} />
      </Stack.Navigator> */}
    </SafeAreaProvider>
    // </NavigationContainer>
  );
};

export default TestCover;
