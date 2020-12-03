import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from 'src/assets/colors';
import useCustomNavigation from 'src/hooks/use-navigation';

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.background,
  },
});

const App: () => JSX.Element = () => {
  const { initSplash } = useCustomNavigation();
  const initApp = async () => {
    initSplash();
  };
  useEffect(() => {
    initApp();
  }, []);
  return <View style={styles.component} />;
};

export default App;
