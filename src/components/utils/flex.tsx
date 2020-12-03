import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import dimensions from 'src/assets/dimensions';

const Flex = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View style={[{ flex: 1, minHeight: dimensions.margin }, style]} />
);

export default Flex;
