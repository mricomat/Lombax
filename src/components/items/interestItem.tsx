import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, ViewProps, ViewStyle, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { colors, fontStyle } from "src/assets";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey50,
    height: 100,
    width: "48%",
    borderRadius: 10,
    marginTop: 12,
    elevation: 3,
    overflow: "hidden",
  },
  linearGradient: {
    backgroundColor: colors.grey50,
    height: 100,
    width: "100%",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: DeviceUtils.deviceSize.width * 0.25,
    height: DeviceUtils.deviceSize.height * 0.16,
    overflow: "hidden",
    alignSelf: "flex-start",
    borderRadius: 5,
    transform: [{ rotate: "-22deg" }],
    left: -5,
    top: -10,
  },
  title: {
    color: colors.white,
    marginStart: 10,
    marginTop: 12,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    ...fontStyle.placeholder,
  },
});

export interface IGameReviewItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageId?: string;
  colorRight?: string;
  colorLeft?: string;
  title?: string;
}

const InterestItem: FC<IGameReviewItem> = ({ styleComponent, onPress, colorLeft, colorRight, imageId, title }) => {
  const uri = getImageUrl(imageId, "t_cover_big");
  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
        colors={[colorLeft ? colorLeft : "#F59B23", colorRight ? colorRight : "#7B4E12"]}
      >
        <View
          style={{
            width: DeviceUtils.deviceSize.width * 0.22,
            height: DeviceUtils.deviceSize.height * 0.12,
            position: "absolute",
            right: -12,
            top: 15,
            overflow: "hidden",
            transform: [
              {
                rotate: "22deg",
              },
            ],
          }}
        >
          <Image source={{ uri }} style={styles.image} />
        </View>

        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default InterestItem;
