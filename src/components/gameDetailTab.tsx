import React, { FC, useState } from "react";
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
  Image,
} from "react-native";

import { colors, fontStyle } from "src/assets";
import GameItem from "src/components/items/gameItem";
import GameReviewItem from "src/components/items/gameReviewItem";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import DeviceUtils from "src/utils/device";
import PlayImg from "src/assets/icons/playV";
import { getImageUrl } from "src/utils/image";

const styles = StyleSheet.create({
  container: {},
  tabStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 1,
  },
  textTab: {
    ...fontStyle.titleMed,
    color: colors.white,
  },
  touchableTab: {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.grey50,
    elevation: 1,
  },
  videoContainer: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: colors.grey50,
    marginTop: 12,
  },
  videoTitle: {
    ...fontStyle.headerTitle,
    color: colors.white,
    marginStart: 15,
    marginTop: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export interface IGameTab extends ViewProps {
  styleComponent?: StyleProp<ViewStyle>;
  game?: IGame;
}

const GameDetailTab: FC<IGameTab> = ({ styleComponent, game }) => {
  const [indexR, setIndex] = useState(0);
  const [routes] = useState([
    { key: "similars", title: "Similars" },
    { key: "reviews", title: "Reviews" },
    { key: "videos", title: "Videos" },
    { key: "screenshots", title: "Screenshots" },
  ]);

  const navigation = useNavigation();

  const renderSimilarGames = () => {
    return (
      <FlatList
        key={"games"}
        data={game?.similar_games}
        renderItem={renderCoverGame}
        numColumns={3}
        keyExtractor={(item, index) => item.id + index}
        style={{ marginTop: 5 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    );
  };

  const renderCoverGame = ({ item, index }) => {
    const width = (DeviceUtils.deviceSize.width - 74) / 3;
    const height = DeviceUtils.deviceSize.height * 0.23;
    return (
      <GameItem
        cover={item.cover}
        styleComponent={{ marginTop: 15 }}
        key={item.id + index}
        styleImage={{ height, width }}
        activity={false}
        onPress={() => navigation.navigate(routeNames.GameDetail, { game: item, isEmpty: true }, game.id)}
      />
    );
  };

  const renderReviews = () => {
    return (
      <FlatList
        key={"reviews"}
        data={[1, 2, 3, 4, 5]}
        renderItem={renderRev}
        style={{ marginTop: 5 }}
        keyExtractor={(item, index) => item + index}
      />
    );
  };

  const renderRev = ({ item, index }) => {
    return <GameReviewItem styleComponent={{ marginTop: 12 }} />;
  };

  const renderVideos = () => {
    return (
      <FlatList
        key={"videos"}
        data={game?.videos}
        renderItem={renderVideoItem}
        style={{ marginTop: 5 }}
        keyExtractor={(item, index) => item.id + index}
      />
    );
  };

  const renderVideoItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => navigation.navigate(routeNames.PlayerScreen, { id: item.video_id })}
      >
        <Image source={{ uri: `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg` }} style={styles.thumbnail} />
        <View style={styles.thumbnail}>
          <View style={[styles.thumbnail, { opacity: 0.5, backgroundColor: colors.grey50 }]} />
          <PlayImg style={{}} />
        </View>
        <Text style={styles.videoTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderScreenshots = () => {
    return (
      <FlatList
        key={"screenshots"}
        data={game?.screenshots}
        renderItem={renderScreenshoots}
        style={{ marginTop: 5 }}
        keyExtractor={(item, index) => item.id + index}
      />
    );
  };

  const renderScreenshoots = ({ item }) => {
    const uri = getImageUrl(item.image_id, "t_screenshot_big_2x");

    return (
      <View style={styles.videoContainer}>
        <Image source={{ uri }} style={[styles.videoContainer, { marginTop: 0 }]} />
      </View>
    );
  };

  const renderScene = (index: number) => {
    switch (index) {
      case 0:
        return renderSimilarGames();
      case 1:
        return renderReviews();
      case 2:
        return renderVideos();
      case 3:
        return renderScreenshots();
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, styleComponent]}>
      <View style={styles.tabStyle}>
        <FlatList
          data={routes}
          horizontal
          style={{ paddingVertical: 2 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const focused = routes[index].key === routes[indexR].key;
            return (
              <TouchableOpacity
                style={[
                  styles.touchableTab,
                  { backgroundColor: focused ? colors.blue100 : colors.grey50 },
                  index !== 0 && { marginStart: 10 },
                ]}
                onPress={() => setIndex(index)}
              >
                <Text style={styles.textTab}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {renderScene(indexR)}
    </View>
  );
};

export default GameDetailTab;
