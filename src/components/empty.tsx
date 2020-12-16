import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";

import { colors, fontStyle } from "src/assets";
import GameItem from "src/components/items/gameItem";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import GhostImg from "src/assets/images/ghost.svg";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    color: colors.white,
    ...fontStyle.titleBold,
    marginTop: 24,
  },
  subTitle: {
    color: colors.grey30,
    ...fontStyle.titleMed,
    marginTop: 12,
  },
});

export interface IEmpty extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
}

const Empty: FC<IEmpty> = ({ styleComponent }) => {
  return (
    <View style={[styles.container, styleComponent]}>
      <GhostImg />
      <Text style={styles.title}>Uh oh, nothing was found</Text>
      <Text style={styles.subTitle}>Try with another filter</Text>
    </View>
  );
};

export default Empty;
