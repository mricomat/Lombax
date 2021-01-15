import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, ImageStyle } from "react-native";

import { colors } from "src/assets";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import HeartImg from "src/assets/icons/heart";
import RevImg from "src/assets/icons/rev.svg";
import { ICover } from "src/types/api";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderWidth: 0.3,
    borderColor: colors.grey10,
    borderRadius: 10,
    height: 184,
    width: 135,
  },
  activityContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginTop: 6,
    flexDirection: "row",
  },
});

export interface IGameItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  cover?: ICover;
  activity?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const GameItem: FC<IGameItem> = ({ styleComponent, cover, onPress, activity, styleImage, disabled = false }) => {
  const uri = getImageUrl(cover && cover.image_id, "t_cover_big_2x");

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress} disabled={disabled}>
      <Image source={{ uri }} style={[styles.image, styleImage]} />
      {activity && (
        <View style={styles.activityContainer}>
          <Stars />
          <RevImg style={{ marginTop: 2, marginStart: 4 }} />
          <HeartImg style={{ marginTop: 0.7, marginStart: 4 }} fill={colors.red70} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GameItem;
