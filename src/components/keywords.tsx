import React, { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  StyleProp,
  ColorValue,
  ViewProps,
  Text,
} from "react-native";

import { colors, fontStyle, dimensions } from "src/assets";
import { IKeyword } from "src/types/api";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  word: {
    ...fontStyle.keyword,
    color: colors.white,
    marginRight: 10,
    textTransform: "capitalize",
  },
  dot: {
    borderRadius: dimensions.radiusCircle,
    backgroundColor: colors.blue50,
    height: 6,
    width: 6,
    marginRight: 10,
    marginTop: 3,
  },
});

export interface IKeywords extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  words: IKeyword[];
  lenght?: number;
}

const Keywords: FC<IKeywords> = ({ styleComponent, words = [], lenght = 14 }) => {
  const newWords = words.filter((item, index) => item.name.length < lenght && index < 4);
  return (
    <View style={[styles.container, styleComponent]}>
      {newWords.map((item, index) => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }} key={item.id}>
            <Text style={styles.word}>{item.name}</Text>
            {index < newWords.length - 1 && <View style={styles.dot} />}
          </View>
        );
      })}
    </View>
  );
};

export default Keywords;
