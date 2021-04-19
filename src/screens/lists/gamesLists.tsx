import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

import { dimensions, fontStyle } from "src/assets";
import colors from "src/assets/colors";
import Header from "src/components/headers";
import useRootContext from "src/hooks/use-context";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import IGame, { IUser } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getCoverUrl, getImageUrl } from "src/utils/image";
import EditButton from "src/components/buttons/edit";

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
  cover: {
    height: 110,
    width: 75,
    borderRadius: 10,
  },
  gameItemContainer: {
    minHeight: 140,
    width: "100%",
    backgroundColor: colors.grey50,
    borderRadius: 15,
  },
  screenshot: {
    position: "absolute",
    width: "100%",
    borderRadius: 15,
    height: "100%",
  },
  opacityBack: {
    position: "absolute",
    width: "100%",
    borderRadius: 15,
    height: "100%",
    backgroundColor: colors.grey50,
    opacity: 0.6,
  },
  itemInfoContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    ...fontStyle.titleBold,
    color: colors.white,
    fontSize: 15,
  },
});

const GamesListSelected: React.FC<any> = ({ route }) => {
  const games = route.params.games;
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();

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

  useEffect(() => {}, []);

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
            title={`Games List`}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderListItem = ({ item }: { item: IGame }) => {
    const uri = getImageUrl(item.cover?.image_id, "t_cover_big_2x");
    const uriScreenshot = getImageUrl(item.screenshots[0].image_id, "t_screenshot_big");
    return (
      <TouchableOpacity style={styles.gameItemContainer}>
        <Image source={{ uri: uriScreenshot }} style={styles.screenshot} />
        <View style={styles.opacityBack} />
        <View style={styles.itemInfoContainer}>
          <Image source={{ uri }} style={styles.cover} />
          <View style={{ marginStart: 14 }}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onEndReached = () => {
    console.log("onEndReached");
    if (!isEnd) {
    }
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        data={games}
        showsVerticalScrollIndicator={false}
        renderItem={renderListItem}
        onEndReachedThreshold={0.01}
        onEndReached={() => onEndReached()}
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}
      />
      <EditButton styleComponent={styles.editButton} onPress={() => navigation.navigate(routeNames.NewList)} />
    </View>
  );
};

export default GamesListSelected;
