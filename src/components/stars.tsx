import React, { FC } from "react";
import { View, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from "react-native";

import { colors } from "src/assets";
import StarImg from "src/assets/icons/star";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export interface IStars extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
}

const StarsComponent: FC<IStars> = ({ styleComponent }) => {
  return (
    <View style={[styles.container, styleComponent]}>
      <StarImg fill={colors.blue100} />
      <StarImg fill={colors.blue100} />
      <StarImg fill={colors.bluer70} />
      <StarImg />
      <StarImg />
    </View>
  );
};

export default StarsComponent;
