import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import InputSearch from "src/components/inputs/search";
import useRootContext from "src/hooks/use-context";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import IGame, { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl } from "src/utils/image";
import EditButton from "src/components/buttons/edit";
import { searchGames } from "src/services/games";
import GameSearchItem from "src/components/items/gameSearchItem";

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
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginEnd: 22,
    marginBottom: 30,
  },
});

const SearchGame: React.FC<any> = ({ route }) => {
  const addGame = route.params && route.params.addGame;
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    outputRange: [DeviceUtils.deviceSize.height, 140],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (search !== "") {
      getGamesService();
    } else {
      setGames([]);
    }
  }, [search]);

  useEffect(() => {}, [user.following]);

  const getGamesService = async (isMore: boolean = false) => {
    const res = await searchGames({ offset: games.length, selections: null, name: search });
    isMore ? setGames([...games, ...res.data]) : setGames([...res.data]);
    res.data.length === 0 && setIsEnd(true);
  };

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
            title={`Add Game`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderGameItem = ({ item }: { item: IGame }) => {
    return (
      <GameSearchItem
        cover={item.cover}
        name={item.name}
        date={item.first_release_date}
        rating={item.total_rating}
        genres={item.genres}
        styleComponent={{ marginBottom: 8 }}
        onPress={() => {
          addGame(item);
          navigation.goBack();
        }}
      />
    );
  };

  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
      getGamesService(true);
    }
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <View style={{ paddingHorizontal: 22 }}>
        <InputSearch
          value={search}
          styleComponent={{}}
          showSwitch={false}
          onChangeText={text => setSearch(text)}
          placeholder={"Find all games"}
        />
      </View>
      <View style={{ flex: 1, marginTop: 12 }}>
        {!isLoading && (
          <Animated.FlatList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
            data={games}
            showsVerticalScrollIndicator={false}
            renderItem={renderGameItem}
            onEndReachedThreshold={0.01}
            style={{ flex: 1 }}
            scrollEnabled
            onEndReached={() => onEndReached()}
            contentContainerStyle={{ paddingHorizontal: 22 }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchGame;
