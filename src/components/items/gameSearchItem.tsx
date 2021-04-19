import React, { FC } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  View,
  ImageStyle,
  Text,
  FlatList,
} from "react-native";
import moment from "moment";

import { colors, fontStyle } from "src/assets";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import HeartImg from "src/assets/icons/heart";
import RevImg from "src/assets/icons/rev.svg";
import { ICover } from "src/types/api";
import { getGameStatusSource } from "src/utils/constants";

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    backgroundColor: colors.grey50,
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
  },
  nameTitle: {
    ...fontStyle.titleBold,
    fontSize: 15,
    color: colors.white,
    maxWidth: "82%",
  },
  image: {
    borderWidth: 0.3,
    borderColor: colors.grey10,
    borderRadius: 15,
    height: 52,
    width: 52,
    marginRight: 16,
  },
  tagGenre: {
    backgroundColor: colors.grey80,
    paddingHorizontal: 11,
    height: 26,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  date: {
    ...fontStyle.keyword,
    color: colors.grey30,
    marginStart: 10,
  },
});

export interface IGameItem extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ImageStyle>;
  cover?: ICover;
  name?: string;
  onPress?: () => void;
}

const GameSearchItem: FC<IGameItem> = ({ styleComponent, cover, onPress, styleImage, name, genres, date }) => {
  const uri = getImageUrl(cover && cover.image_id, "t_cover_big_2x");

  const renderTag = ({ item, index }) => {
    return index < 3 ? (
      <View style={styles.tagGenre}>
        <Text style={{ ...fontStyle.titleMed, color: colors.white, fontSize: 13 }}>{item.name}</Text>
      </View>
    ) : (
      <View />
    );
  };

  return (
    <TouchableOpacity style={[styles.container, styleComponent]} onPress={onPress}>
      <Image source={{ uri }} style={[styles.image, styleImage]} />
      <View
        style={{
          paddingVertical: 2,
          width: "100%",
          flex: 1,
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row", width: "100%" }}>
          <Text style={styles.nameTitle} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.date}>{moment(date * 1000).format("YYYY")}</Text>
        </View>

        <FlatList
          data={genres}
          renderItem={renderTag}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ height: 27, marginTop: 8 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default GameSearchItem;
