import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import GameItem from "src/components/items/gameItem";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getGameFeels } from "src/services/game";
import { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl } from "src/utils/image";

const styles = StyleSheet.create({
  component: {
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
  cover: {
    borderRadius: 10,
    height: 160,
    width: 130,
    marginTop: 22,
    alignSelf: "center",
  },
});

const GameFeels: React.FC<any> = ({ route }) => {
  const [user, setUser] = useState<IUser>((route.params && route.params.user) || {});
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

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

  useEffect(() => {
    if (isLoading) {
      getGamesService();
    }
  }, []);

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

  const getGamesService = async () => {
    const { data, error } = await getGameFeels(user.id, games.length);
    if (!error) {
      data.count !== 0 ? setGames([...games, ...data.gameFeels]) : setIsEnd(true);
    }
    setIsLoading(false);
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 22 }}>
          <Header
            title={`${user.name}'s Games`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderGameItem = ({ item, index }) => {
    const width = (DeviceUtils.deviceSize.width - 65) / 3;
    const height = DeviceUtils.deviceSize.height * 0.24;
    return (
      <GameItem
        cover={{ image_id: item.game.imageId }}
        styleComponent={{ marginTop: 10, marginEnd: 10 }}
        key={item._id + index}
        styleImage={{ height, width }}
        diary={{ gameFeel: item }}
        activity={true}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item, isEmpty: true }, item.id)}
      />
    );
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
      getGamesService();
    }
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      {isLoading && (
        <View style={{ flex: 1, alignItems: "center", marginBottom: 100 }}>
          <PacmanIndicator color="white" size={40} />
        </View>
      )}
      {!isLoading && (
        <View style={{ flex: 1 }}>
          <Animated.FlatList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
            data={games}
            showsVerticalScrollIndicator={false}
            renderItem={renderGameItem}
            onEndReachedThreshold={0.01}
            numColumns={3}
            onEndReached={() => onEndReached()}
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default GameFeels;
