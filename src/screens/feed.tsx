import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList } from "react-native";
import lodash from "lodash";
import LinearGradient from "react-native-linear-gradient";
import RNBootSplash from "react-native-bootsplash";

import colors, { gradients } from "src/assets/colors";
import { fontStyle } from "src/assets";
import { getMainGame, getTopRated } from "src/services/games";
import { getImageUrl } from "src/utils/image";
import DeviceUtils from "src/utils/device";
import Keywords from "src/components/keywords";
import HeartImg from "src/assets/icons/heart.svg";
import InfoImg from "src/assets/icons/info.svg";
import PlayImg from "src/assets/icons/play.svg";
import GameList from "src/components/gameList";
import GenreModal from "src/components/modals/genresModal";
import FeedIcon from "src/assets/icons/logo.svg";
import ArrowDownImg from "src/assets/icons/arrow_down.svg";
import IGame from "src/types/api";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

const IMAGE_HEIGTH = DeviceUtils.deviceSize.height - 60;

const styles = StyleSheet.create({
  component: {
    backgroundColor: colors.grey80,
    flex: 1,
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: IMAGE_HEIGTH,
    backgroundColor: colors.grey80,
    resizeMode: "cover",
  },
  linear: {
    position: "absolute",
    width: "100%",
    height: IMAGE_HEIGTH,
  },
  trailerButton: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 10,
    maxHeight: 40,
    alignItems: "center",
  },
  trailerTitle: {
    ...fontStyle.titleBold,
    color: colors.grey80,
    marginStart: 10,
  },
  icon: {
    transform: [{ scale: 0.8 }],
  },
  iconText: {
    ...fontStyle.menuLabel,
    color: colors.white,
    alignSelf: "center",
    marginTop: 6,
  },
  infoMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 55,
    marginTop: 24,
  },
  sectionsContainer: {
    marginTop: 20,
  },
  title: {
    ...fontStyle.titleMed,
    color: colors.white,
    marginStart: 8,
    marginEnd: 5,
  },
  headerContainer: {
    position: "absolute",
    flexDirection: "row",
    marginStart: 30,
    marginTop: 40,
    alignItems: "center",
  },
});

const Feed: () => JSX.Element = () => {
  const [mainGame, setMainGame] = useState<IGame>();
  const [recentGames, setRecentGames] = useState<IGame[]>([]);
  const [topGames, setTopGames] = useState<IGame[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    mainGameService();
  }, []);

  const mainGameService = async () => {
    const mainGamesResult = await getMainGame();
    const mainIndex = Math.floor(Math.random() * mainGamesResult.data.length);
    setMainGame(mainGamesResult.data[mainIndex]);
    mainGamesResult.data.splice(mainIndex, 1);
    setRecentGames(mainGamesResult.data);
    RNBootSplash.hide({ fade: true });
    const topGamesRes = await getTopRated();
    setTopGames(topGamesRes.data);
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity style={styles.headerContainer} onPress={() => setShowModal(true)}>
        <FeedIcon />
        <Text style={styles.title}>All games</Text>
        <ArrowDownImg style={{ marginTop: 2 }} />
      </TouchableOpacity>
    );
  };

  const renderMainImage = () => {
    const uri = getImageUrl(!lodash.isEmpty(mainGame) && mainGame.cover && mainGame.cover.image_id, "t_cover_big_2x");
    return (
      <>
        <Image source={{ uri }} style={styles.imageBackground} />
        <LinearGradient colors={gradients.bottomMain} style={styles.linear} />
        <LinearGradient colors={gradients.topMain} style={[styles.linear, { height: 150 }]} />
        {renderHeader()}
      </>
    );
  };

  const renderInfoMain = () => {
    return (
      <View style={{ marginTop: DeviceUtils.deviceSize.height * 0.6 }}>
        <Keywords words={mainGame && mainGame.keywords} />
        <View style={styles.infoMainContainer}>
          <TouchableOpacity>
            <HeartImg style={styles.icon} />
            <Text style={styles.iconText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trailerButton}
            onPress={() =>
              navigation.navigate(routeNames.PlayerScreen, {
                id: mainGame && mainGame.videos && mainGame.videos[0].video_id,
              })
            }
          >
            <PlayImg style={styles.icon} />
            <Text style={styles.trailerTitle}>Play trailer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(routeNames.GameDetail, { game: mainGame })}>
            <InfoImg style={styles.icon} />
            <Text style={styles.iconText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSections = () => {
    return (
      <View style={styles.sectionsContainer}>
        <GameList title={"Most recently released"} games={recentGames} />
        <GameList title={"Top rated of year"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Your recent friends activity"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Your playlist"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Recently reviewed"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Action games"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Platform games"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Top rated of year"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Top rated of year"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Top rated of year"} games={topGames} styleComponent={{ marginTop: 20 }} />
        <GameList title={"Top rated of year"} games={topGames} styleComponent={{ marginTop: 20 }} />
      </View>
    );
  };

  return (
    <View style={styles.component}>
      <ScrollView>
        {renderMainImage()}
        {renderInfoMain()}
        {renderSections()}
      </ScrollView>
      <GenreModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default Feed;
