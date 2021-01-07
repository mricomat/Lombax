import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList, Animated } from "react-native";
import moment from "moment";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

import colors, { gradients } from "src/assets/colors";
import { dimensions, fontStyle } from "src/assets";
import Header from "src/components/headers";
import IGame, { IDataItem } from "src/types/api";
import DeviceUtils from "src/utils/device";
import GameItem from "src/components/items/gameItem";

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  backgroundContainer: {
    height: DeviceUtils.deviceSize.height * 0.6,
    width: "100%",
    alignSelf: "center",
    position: "absolute",
  },
  imageBackground: {
    height: DeviceUtils.deviceSize.height * 0.6,
    width: "100%",
    alignSelf: "center",
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  backColor: {
    backgroundColor: colors.grey40,
    position: "absolute",
    height: DeviceUtils.deviceSize.height * 0.6,
    width: "100%",
    opacity: 0.5,
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
  infoContainer: {
    borderRadius: 15,
    backgroundColor: colors.grey50,
    height: 75,
    elevation: 2,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  titleInfo: {
    ...fontStyle.menuLabel,
    color: colors.grey30,
  },
  titleInfoDes: {
    marginTop: 4,
    color: colors.white,
    ...fontStyle.titleMed,
  },
  title: {
    ...fontStyle.headerTitle,
    alignSelf: "center",
    color: colors.white,
    marginTop: 26,
  },
  developTitle: {
    ...fontStyle.menuLabel,
    alignSelf: "center",
    color: colors.grey30,
    marginTop: 10,
  },
  developDetail: {
    ...fontStyle.titleMed,
    alignSelf: "center",
    color: colors.white,
    marginTop: 2,
  },
  centerContainer: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  overView: {
    ...fontStyle.headerTitle,
    color: colors.white,
    marginTop: 20,
  },
  description: {
    color: colors.blue20,
    ...fontStyle.titleMed,
    marginTop: 20,
    lineHeight: 20,
  },
  genrePlatformContainer: {
    borderRadius: 15,
    backgroundColor: colors.grey50,
    paddingVertical: 18,
    elevation: 2,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
  },
  tagsList: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.grey80,
    marginTop: 10,
  },
  titleTag: {
    color: colors.white,
    ...fontStyle.titleMed,
    maxWidth: DeviceUtils.deviceSize.width * 0.2,
    textTransform: "capitalize",
  },
  playButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: -12,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginEnd: 22,
    marginBottom: 30,
  },
});

const MosaicScreen: React.FC<any> = ({ route }) => {
  const [games] = useState<IGame[]>((route.params && route.params.games) || []);

  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height * 0.6, 80],
    extrapolate: "clamp",
  });

  const renderBackground = () => {
    return (
      <Animated.View style={[styles.backgroundContainer, { height: heightBack }]}>
        <Animated.Image
          source={require("src/assets/images/backhollow.png")}
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
            title={"Mosaic Screen"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  const renderCoverGame = ({ item, index }) => {
    const width = (DeviceUtils.deviceSize.width - 65) / 3;
    const height = DeviceUtils.deviceSize.height * 0.24;
    return (
      <GameItem
        cover={item.cover}
        styleComponent={{ marginTop: 10 }}
        key={item.id + index}
        styleImage={{ height, width }}
        activity={false}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item, isEmpty: true }, item.id)}
      />
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <View style={{ paddingHorizontal: 22, marginBottom: 20 }}>
          <FlatList
            data={games}
            renderItem={renderCoverGame}
            numColumns={3}
            keyExtractor={(item, index) => item.id + index}
            style={{ marginTop: 5 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MosaicScreen;
