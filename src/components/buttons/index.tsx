import { Color } from "csstype";
import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import { colors, dimensions, fontStyle } from "../../assets/index";

export interface IProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle | ViewStyle[];
  fontStyles?: TextStyle | TextStyle[];
  color?: Color; // text/indicator color
  backgroundColor?: Color; // button color
  inactive?: boolean;
  loading?: boolean;
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: 52,
    elevation: 3,
    borderRadius: dimensions.radius,
  },
  inactive: {
    backgroundColor: colors.grey50,
  },
  text: {
    ...fontStyle.titleMed,
    fontSize: 15,
  },
});

const SimpleButton: FC<IProps> = props => {
  const {
    onPress,
    title,
    style = {},
    fontStyles = {},
    backgroundColor = colors.blue100,
    color = colors.white,
    inactive = false,
    disabled = false,
    loading = false,
    Icon,
  } = props;

  const textComponent = (
    <>
      {Icon && <Icon style={{ marginEnd: 8 }} />}
      <Text style={[styles.text, { color }, fontStyles]}>{title}</Text>
    </>
  );

  const loadingComponent = loading && <ActivityIndicator size="small" color={"white"} />;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, { ...style }, inactive && styles.inactive]}
      disabled={disabled || inactive}
      onPress={() => {
        !loading && Keyboard.dismiss();
        !loading && onPress();
      }}
    >
      {!loading && textComponent}
      {loadingComponent}
    </TouchableOpacity>
  );
};

export default SimpleButton;
