import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";

import { colors, fontStyle } from "src/assets";
import GameItem from "src/components/items/gameItem";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  title: {
    ...fontStyle.titleMed,
    color: colors.white,
    marginBottom: 12,
    marginStart: 20,
  },
});

export interface IGameList extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  title?: string;
  games?: IGame[];
}

const GameList: FC<IGameList> = ({ styleComponent, games = [], title }) => {
  const navigation = useNavigation();
  const renderItem = ({ item, index }) => {
    return item.cover ? (
      <GameItem
        cover={item.cover}
        styleComponent={{ marginRight: 10 }}
        key={item.id + index}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item })}
      />
    ) : (
      <View />
    );
  };

  return (
    <View style={[styles.container, styleComponent]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList data={games} renderItem={renderItem} horizontal contentContainerStyle={{ marginStart: 20 }} />
    </View>
  );
};

export default GameList;
