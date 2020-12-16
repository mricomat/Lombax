import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, Text } from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import HeartImg from "src/assets/icons/heart";
import ArroLeftImg from "src/assets/icons/arrow_left.svg";
import GameImg from "src/assets/icons/game.svg";
import { ICover } from "src/types/api";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 32,
    height: 32,
    position: "absolute",
  },
  circleContainer: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
  },
  title: {
    ...fontStyle.headerTitle,
    color: colors.white,

    alignSelf: "center",
  },
  titleContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
  },
});

export interface IHeader extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  title?: string;
  onBackPress?: () => void;
  playIcon?: boolean;
  heart?: boolean;
}

const MainHeader: FC<IHeader> = ({ styleComponent, onBackPress, title, playIcon = true, heart = true }) => {
  return (
    <View style={[styles.container, styleComponent]}>
      <TouchableOpacity style={styles.circleContainer} onPress={onBackPress}>
        <View style={styles.circle} />
        <ArroLeftImg />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        {playIcon && (
          <TouchableOpacity style={[styles.circleContainer, { marginEnd: 5 }]}>
            <View style={styles.circle} />
            <GameImg />
          </TouchableOpacity>
        )}
        {heart && (
          <TouchableOpacity style={styles.circleContainer}>
            <View style={styles.circle} />
            <HeartImg width={17} height={13} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MainHeader;
