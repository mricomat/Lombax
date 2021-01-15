import React, { FC } from "react";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle, TouchableOpacity } from "react-native";

import { colors, fontStyle } from "src/assets";
import GameItem from "src/components/items/gameItem";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import RoudedPlusImg from "src/assets/icons/rounded_plus.svg";

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
      <View
        style={{
          borderWidth: 0.3,
          borderColor: colors.grey10,
          borderRadius: 10,
          backgroundColor: colors.grey50,
          height: 184,
          width: 135,
          marginRight: 10,
        }}
      ></View>
    );
  };

  return (
    <View style={[styles.container, styleComponent]}>
      {title && (
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={{ marginStart: 10 }}
            onPress={() => navigation.navigate(routeNames.MosaicScreen, { games })}
          >
            <RoudedPlusImg />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={games}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{ marginStart: 22, paddingEnd: 22 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default GameList;
