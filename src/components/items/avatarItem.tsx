import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, ImageStyle } from "react-native";

import { colors } from "src/assets";
import { getImageUrl } from "src/utils/image";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey50,
    height: 90,
    width: 90,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
  },
});

export interface IAvatarItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;

  onPress?: () => void;
}

const AvatarItem: FC<IAvatarItem> = ({ styleComponent, onPress, data = "p3svrq6ewzxnn7p1a3v9" }) => {
  const uri = getImageUrl(data, "t_cover_big");

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default AvatarItem;
