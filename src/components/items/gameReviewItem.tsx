import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, Text } from "react-native";

import { colors, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import HeartImg from "src/assets/icons/heart";
import RevImg from "src/assets/icons/rev.svg";
import { ICover } from "src/types/api";
import Star from "src/assets/icons/star";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.grey50,
    borderRadius: 15,
    elevation: 2,
  },
  image: {
    borderWidth: 0.3,
    borderColor: colors.grey10,
    borderRadius: 50,
    height: 42,
    width: 42,
    marginTop: 2,
  },
  userTitle: {
    ...fontStyle.titleMed,
    color: colors.white,
  },
  rev: {
    ...fontStyle.titleMed,
    color: colors.grey30,
    marginTop: 8,
    lineHeight: 19,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export interface IGameReviewItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;

  onPress?: () => void;
}

const GameReviewItem: FC<IGameReviewItem> = ({ styleComponent, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.image} />
      <View style={{ marginStart: 15, flex: 1 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.userTitle}>Alberto</Text>
          <Stars />
        </View>
        <Text style={styles.rev} numberOfLines={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GameReviewItem;
