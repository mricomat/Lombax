import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import useRootContext from "src/hooks/use-context";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import DeviceUtils from "src/utils/device";
import { getCoverUrl } from "src/utils/image";
import Input from "src/components/inputs/simple";
import Button from "src/components/buttons";
import Cross from "src/assets/icons/cross";
import IGame from "src/types/api";
import { FlatList } from "react-native-gesture-handler";
import GameList from "src/components/gameList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    width: "100%",
    alignSelf: "center",
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    width: "100%",
    opacity: 0.75,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  addGameTouchable: {
    height: 184,
    width: 135,
    marginTop: 12,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: colors.grey50,
    alignItems: "center",
    justifyContent: "center",
  },
});

const NewList: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [games, setGames] = useState<any[]>([]);

  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {}, [user.following]);

  const renderBackground = () => {
    const uri = getCoverUrl(user.backgroundId);
    return (
      <Animated.View style={[styles.backgroundContainer, { height: heightBack }]}>
        <Animated.Image
          source={{ uri }}
          style={[styles.imageBackground, { height: heightBack }]}
          resizeMode={"cover"}
        />
        <Animated.View style={[styles.backColor, { height: heightBack }]} />
      </Animated.View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 22 }}>
          <Header
            title={`New List`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const addGame = (game: IGame) => {
    if (game) setGames([game, ...games]);
  };

  const renderAddGames = () => {
    return (
      <View style={{ marginTop: 12 }}>
        <Text style={{ ...fontStyle.titleBold, color: colors.white }}>Games</Text>
        <TouchableOpacity
          style={styles.addGameTouchable}
          onPress={() => navigation.navigate(routeNames.SearchGame, { addGame })}
        >
          <Cross fill={colors.white} style={{ transform: [{ rotate: "45deg" }] }} width={14} height={14} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderGames = () => {
    return (
      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate(routeNames.GameSelectedList, { games })}
      >
        <Text style={{ ...fontStyle.titleBold, color: colors.white, paddingHorizontal: 22, marginBottom: 12 }}>
          Games
        </Text>
        <GameList games={games} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        contentContainerStyle={{}}
      >
        <View style={{ paddingHorizontal: 22 }}>
          <Input placeholder={"Name"} />
          <Input placeholder={"Description"} isDescription styleContent={{ marginTop: 12 }} />
        </View>
        {games.length === 0 ? renderAddGames() : renderGames()}

        {/* <Button title={"Save"} style={{ marginTop: 22, marginBottom: 20 }} /> */}
      </ScrollView>
    </View>
  );
};

export default NewList;
