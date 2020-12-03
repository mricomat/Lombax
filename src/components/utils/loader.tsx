import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  StyleProp,
  ColorValue,
  ViewProps,
} from 'react-native';

import colors from 'src/assets/colors';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
  },
});

export interface ILoaderProps extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  style?: StyleProp<ImageStyle>;
  isFull?: boolean; // alternate between big and small gif
  color?: ColorValue;
}

/* loader to show when first loading screen */
const Loader: FC<ILoaderProps> = ({ style, styleComponent, isFull, color = colors.primary }) => (
  <View style={[styles.view, isFull && StyleSheet.absoluteFill, styleComponent]}>
    <ActivityIndicator style={style} color={color} size={isFull ? 'large' : 'small'} />
  </View>
);

export default Loader;
