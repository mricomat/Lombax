import React, { FC } from "react";
import { View, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from "react-native";

import { colors } from "src/assets";
import StarImg from "src/assets/icons/star";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export interface IStars extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  rating: number;
  width?: number;
  height?: number;
}

const StarsComponent: FC<IStars> = ({ styleComponent, rating, width, height }) => {
  return (
    <View style={[styles.container, styleComponent]}>
      <StarImg fill={rating < 1 ? colors.grey65 : colors.blue100} width={width} height={height} />
      <StarImg fill={rating < 2 ? colors.grey65 : colors.bluer70} width={width} height={height} />
      <StarImg fill={rating < 3 ? colors.grey65 : colors.blue50} width={width} height={height} />
      <StarImg fill={rating < 4 ? colors.grey65 : colors.blue50} width={width} height={height} />
      <StarImg fill={rating < 5 ? colors.grey65 : colors.blue50} width={width} height={height} />
    </View>
  );
};

export default StarsComponent;
