import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, ImageStyle } from "react-native";

import { colors } from "src/assets";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import HeartImg from "src/assets/icons/heart";
import RevImg from "src/assets/icons/rev.svg";
import { ICover } from "src/types/api";
import { getGameStatusSource } from "src/utils/constants";

const styles = StyleSheet.create({
  container: {
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
  gameStatusContainer: {
    position: "absolute",
    borderRadius: 50,
    height: 28,
    width: 28,
    top: -5,
    right: -5,
  },
  gameStatusImage: {
    width: 30,
    height: 30,
    marginTop: 7,
    marginLeft: -1,
  },
});

export interface IGameItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  cover?: ICover;
  activity?: boolean;
  diary?: any;
  disabled?: boolean;
  onPress?: () => void;
}

const GameItem: FC<IGameItem> = ({
  styleComponent,
  cover,
  onPress,
  activity,
  styleImage,
  disabled = false,
  diary = {},
}) => {
  const uri = getImageUrl(cover && cover.image_id, "t_cover_big_2x");

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress} disabled={disabled}>
      <Image source={{ uri }} style={[styles.image, styleImage]} />
      {activity && diary.gameFeel && diary.gameFeel.gameStatus && (
        <View style={[styles.gameStatusContainer, { backgroundColor: colors.grey80 }]}>
          <Image source={getGameStatusSource[diary.gameFeel.gameStatus]} style={styles.gameStatusImage} />
        </View>
      )}
      {activity && (
        <View style={styles.activityContainer}>
          {diary.review && diary.review.rating !== 0 && (
            <Stars rating={diary.review.rating} styleComponent={{ marginEnd: 4 }} />
          )}
          {diary.review && diary.review.summary !== "" && <RevImg style={{ marginTop: 2, marginStart: 2 }} />}
          {diary.gameFeel && diary.gameFeel.like && (
            <HeartImg style={{ marginTop: 0.7, marginStart: 4 }} fill={colors.red70} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GameItem;
