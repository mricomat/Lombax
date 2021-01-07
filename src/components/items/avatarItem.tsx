import React, { FC } from "react";
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle, View, ImageStyle } from "react-native";

import { colors } from "src/assets";
import { getCoverUrl } from "src/utils/image";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grey50,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.blue20,
  },
});

export interface IAvatarItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  data?: string;
  onPress?: () => void;
}

const AvatarItem: FC<IAvatarItem> = ({ styleComponent, onPress, data }) => {
  const uri = getCoverUrl(data);

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default AvatarItem;
