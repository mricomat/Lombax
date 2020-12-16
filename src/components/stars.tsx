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
  const fiveRating = (rating / 100) * 5;
  return (
    <View style={[styles.container, styleComponent]}>
      <StarImg fill={fiveRating < 1 ? colors.grey65 : colors.blue100} width={width} height={height} />
      <StarImg fill={fiveRating < 2 ? colors.grey65 : colors.bluer70} width={width} height={height} />
      <StarImg fill={fiveRating < 3 ? colors.grey65 : colors.blue50} width={width} height={height} />
      <StarImg fill={fiveRating < 4 ? colors.grey65 : colors.blue50} width={width} height={height} />
      <StarImg fill={fiveRating < 5 ? colors.grey65 : colors.blue50} width={width} height={height} />
    </View>
  );
};

export default StarsComponent;
