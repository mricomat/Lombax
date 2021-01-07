import lodash from "lodash";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import moment from "moment";

import { fontStyle } from "src/assets";
import colors, { gradients } from "src/assets/colors";
import PlayImg from "src/assets/icons/play_v.svg";
import GameList from "src/components/gameList";
import Keywords from "src/components/keywords";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import { getMainGame, getsevenDaysGames, getSoonGames } from "src/services/games";
import IGame from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";
import Skeleton from "src/components/skeleton";

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
  cover: {
    borderRadius: 10,
    height: 160,
    width: 130,
    marginTop: 22,
    alignSelf: "center",
  },
  infoMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 55,
    marginTop: 24,
  },
  sectionsContainer: {
    marginTop: -170,
  },
  title: {
    ...fontStyle.headerTitle,
    alignSelf: "center",
    color: colors.white,
    marginTop: 20,
  },
  developTitle: {
    ...fontStyle.menuLabel,
    alignSelf: "center",
    color: colors.grey65,
    marginTop: 10,
  },
  developDetail: {
    ...fontStyle.titleMed,
    alignSelf: "center",
    color: colors.white,
    marginTop: 2,
  },
  headerContainer: {
    position: "absolute",
    flexDirection: "row",
    marginStart: 30,
    marginTop: 40,
    alignItems: "center",
  },
  playButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: -12,
  },
  infoBarContainer: {
    borderRadius: 15,
    backgroundColor: colors.grey50,
    paddingVertical: 18,
    elevation: 2,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 26,
    flexWrap: "wrap",
  },
  titleTag: {
    color: colors.white,
    ...fontStyle.titleMed,
    maxWidth: DeviceUtils.deviceSize.width * 0.2,
    textTransform: "capitalize",
  },
});

const Soon: () => JSX.Element = () => {
  const [recentGames, setRecentGames] = useState<IGame[]>([]);
  const [topGames, setTopGames] = useState<IGame[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    mainGameService();
  }, []);

  const mainGameService = async () => {
    const mainGamesResult = await getSoonGames();
    setRecentGames(mainGamesResult.data);
    const topGamesRes = await getsevenDaysGames();
    setTopGames(topGamesRes.data);
    setIsLoading(false);
  };

  const renderMainImage = item => {
    const uri = getImageUrl(!lodash.isEmpty(item) && item.cover && item.cover.image_id, "t_cover_big_2x");
    return (
      <>
        <Image source={{ uri }} style={styles.imageBackground} />
        <LinearGradient colors={gradients.bottomMain} style={styles.linear} />
        <LinearGradient colors={gradients.topMain} style={[styles.linear, { height: 150 }]} />
      </>
    );
  };

  const renderSwipeItem = item => {
    return (
      <>
        {renderMainImage(item)}
        <View style={{ marginTop: 60, paddingHorizontal: 22 }}>
          {renderCover(item)}
          {renderTitle(item)}
          {renderBarInfo(item)}
        </View>
      </>
    );
  };

  const renderBarInfo = item => {
    return (
      <View style={styles.infoBarContainer}>
        <View>
          <Text style={[styles.developTitle, { marginTop: 0, marginBottom: 5 }]}>Platforms</Text>
          <Keywords words={item.platforms || []} />
        </View>
        <View>
          <Text style={[styles.developTitle, { marginTop: 0, marginBottom: 5 }]}>Date</Text>
          <Text style={{ ...fontStyle.keyword, color: colors.white }}>
            {moment.unix(item.release_dates[0].date).format("MMM DD YYYY")}
          </Text>
        </View>
      </View>
    );
  };

  const renderCover = item => {
    const uri = getImageUrl(item.cover && item.cover.image_id, "t_cover_big");
    return (
      <View>
        <Image source={{ uri }} style={styles.cover} resizeMode={"contain"} />
        {item.videos && item.videos?.length > 0 && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate(routeNames.PlayerScreen, { id: item.videos && item.videos[0].video_id })}
          >
            <PlayImg />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderTitle = item => {
    return (
      <>
        <Text style={styles.title}>{item && item.name}</Text>
        <Keywords words={item && item.keywords} styleComponent={{ marginTop: 10 }} />
        <Text style={styles.developTitle}>Developed by</Text>
        <Text style={styles.developDetail}>{getDevelopersName(item)}</Text>
      </>
    );
  };

  const getDevelopersName = item => {
    if (item.involved_companies && item.involved_companies.length > 0) {
      let companies = item.involved_companies?.filter(i => i.developer);
      if (!companies || companies?.length <= 0) companies = item.involved_companies;
      return companies[0].company.name;
    }
    return [];
  };

  const renderSections = () => {
    return (
      <View style={styles.sectionsContainer}>
        <GameList title={"Upcoming in 7 days"} games={topGames} styleComponent={{}} />
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
        <Swiper
          style={{ backgroundColor: colors.grey80 }}
          index={index}
          showsHorizontalScrollIndicator={false}
          showsPagination={false}
          onIndexChanged={index => setIndex(index)}
        >
          {recentGames.map((item, index) => {
            return (
              <View style={{ flex: 1 }} key={item.id + index}>
                {renderSwipeItem(item)}
              </View>
            );
          })}
        </Swiper>
        {renderSections()}
      </ScrollView>
      {isLoading && <Skeleton />}
    </View>
  );
};

export default Soon;
