/* eslint-disable react/display-name */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// // it doesn't matter what the parameter is. It will be mocked.
// const MySafeArea = React.createContext(null);

// // wrap your component into this new provider
// <MySafeArea.Provider>
//   <View>
//     <Text>Hello!</Text>
//   </View>
// </MySafeArea.Provider>;
