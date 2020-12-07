import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, Text } from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";

import PencilImg from "src/assets/icons/pencil.svg";

const styles = StyleSheet.create({
  container: {
    borderRadius: dimensions.radiusCircle,
    height: 51,
    width: 51,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export interface IEditButton extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const EditButton: FC<IEditButton> = ({ styleComponent, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <PencilImg />
    </TouchableOpacity>
  );
};

export default EditButton;
