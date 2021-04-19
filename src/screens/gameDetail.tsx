import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList, Animated } from "react-native";
import moment from "moment";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

import colors, { gradients } from "src/assets/colors";
import { dimensions, fontStyle } from "src/assets";
import Header from "src/components/headers";
import IGame, { GameStatus, IDataItem, IGameFeel } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";
import PlayImg from "src/assets/icons/play_v.svg";
import StartImg from "src/assets/icons/star";
import GameDetailTab from "src/components/gameDetailTab";
import EditButton from "src/components/buttons/edit";
import GameModal from "src/components/modals/gameModal";
import { getGameById } from "src/services/games";
import { getGameInfo } from "src/services/game";
import { postReview, getUserGameReview, updateReview } from "src/services/reviews";
import useRootContext from "src/hooks/use-context";
import { gameStatusColors } from "src/utils/constants";
import { postGameFeel } from "src/services/game";

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
  gameStatus: {
    width: "98%",
    height: 4,
    alignSelf: "center",

    borderRadius: 15,
    marginTop: 12,
    elevation: 1,
  },
});

const GameDetail: React.FC<any> = ({ route }) => {
  const {
    langState: [lang],
    user: [user, setUser],
  } = useRootContext();
  const [game, setGame] = useState<IGame>((route.params && route.params.game) || {});
  const [isLoading, setIsLoading] = useState<boolean>(route.params.isEmpty || false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ratingReview, setRatingReview] = useState<any>({});
  const [gameFeel, setGameFeel] = useState<IGameFeel>();
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

  useEffect(() => {
    if (isLoading) {
      getGameService();
    }
    getGameInfoService();
  }, []);

  const getGameService = async () => {
    const { data } = await getGameById(game.id);
    setGame(data[0]);
    setIsLoading(false);
  };

  const getGameInfoService = async () => {
    const result = await getGameInfo(user.id, game.id);
    if (!result.error) {
      const reviews = result.data.reviews;
      if (reviews.length > 0) {
        setRatingReview(reviews[0]);
      }
      const gameFeel = result.data.gameFeel;
      if (gameFeel) {
        setGameFeel(gameFeel);
      }
    }
  };

  const sendRatingReview = async (rating: number) => {
    const result = await postReview(
      {
        userId: user.id,
        rating,
        game,
      },
      GameStatus.Beaten
    );
    if (!result.error) {
      setRatingReview(result.data.review);
      setGameFeel(result.data.gameFeel);

      // Add GameFeel to User
      if (gameFeel) {
        const newGameFeels = [...user.gameFeels];
        setUser({ ...user, gameFeels: [result.data.gameFeel, ...user.gameFeels] });
        const gameFeelIndex = user.gameFeels.indexOf(gameFeel._id);
        if (gameFeelIndex > -1) {
          newGameFeels.splice(gameFeelIndex, 1);
        }

        setUser({ ...user, gameFeels: [result.data.gameFeel, ...newGameFeels] });
      } else {
        setUser({ ...user, gameFeels: [result.data.gameFeel, ...user.gameFeels] });
      }
    }
  };

  const renderBackground = () => {
    const uri = getImageUrl(game.screenshots && game.screenshots[0].image_id, "t_screenshot_big");
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

  const renderCover = () => {
    const uri = getImageUrl(game.cover && game.cover.image_id, "t_cover_big");
    return (
      <View>
        <Image source={{ uri }} style={styles.cover} resizeMode={"contain"} />
        {game.videos && game.videos?.length > 0 && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate(routeNames.PlayerScreen, { id: game.videos && game.videos[0].video_id })}
          >
            <PlayImg />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const calculateRating = (rating: number) => {
    return ((rating / 100) * 5).toFixed(2);
  };

  const getDevelopersName = () => {
    let companies = game.involved_companies?.filter(item => item.developer);
    if (!companies || companies?.length <= 0) companies = game.involved_companies;
    return companies[0].company.name;
  };

  const renderGameModal = () => {
    return (
      <GameModal
        showModal={showModal}
        setShowModal={setShowModal}
        rating={ratingReview.rating}
        isFavorite={user.favorites.findIndex(item => item.id === game.id) !== -1}
        favoritePress={() => {
          setShowModal(false);
          navigation.navigate(routeNames.FavoriteSelection, { game });
        }}
        playPress={() => {
          setShowModal(false);
          navigation.navigate(routeNames.GameStatus, { game, gameFeel, setGameFeel });
        }}
        ratePress={rating => {
          sendRatingReview(rating);
        }}
        reviewPress={() => {
          setShowModal(false);
          navigation.navigate(routeNames.NewReview, {
            game,
            gameFeel,
            rating: ratingReview.rating,
            setRatingReview,
            setGameFeel,
          });
        }}
      />
    );
  };

  const renderInfoContainer = () => {
    return (
      <>
        <View style={styles.infoContainer}>
          <View style={{ alignItems: "center", marginStart: 10 }}>
            <Text style={styles.titleInfo}>Rating</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StartImg fill={colors.blue50} style={{ marginEnd: 5, marginTop: 2.7 }} />
              <Text style={styles.titleInfoDes}>{calculateRating(game.total_rating || 0)}</Text>
            </View>
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.titleInfo}>Time to beat</Text>
            <Text style={styles.titleInfoDes}>30 to 40h</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleInfo}>Date</Text>
            <Text style={styles.titleInfoDes}>{moment.unix(game.release_dates[0].date).format("MMM DD YYYY")}</Text>
          </View>
        </View>
        {gameFeel && gameFeel.gameStatus && (
          <View style={[styles.gameStatus, { backgroundColor: gameStatusColors[gameFeel.gameStatus] }]} />
        )}
      </>
    );
  };

  const renderGenres = () => {
    return (
      <View style={styles.genrePlatformContainer}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[styles.titleInfo, { marginStart: 2 }]}>Genres</Text>
          {renderTagList(game.genres || [], true)}
        </View>
        <View style={{ alignItems: "flex-end", marginStart: 10 }}>
          <Text style={[styles.titleInfo, { marginEnd: 2 }]}>Themes</Text>
          {renderTagList(game.themes || [])}
        </View>
      </View>
    );
  };

  const renderPlatforms = () => {
    return (
      <View style={styles.genrePlatformContainer}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={[styles.titleInfo, { marginStart: 2 }]}>Platforms</Text>
          {renderPlatformsTags(game.platforms || [])}
        </View>
      </View>
    );
  };

  const renderTagList = (tags: IDataItem[], isLeft = false) => {
    const emptyTag = { id: "", name: "", slug: "" };
    let newTags = [...tags];
    let lengthLastItem = 0;
    newTags.map((item, index) => {
      if (item.name.length > 12) {
        newTags.splice(index + 1, 0, emptyTag);
      } else if (lengthLastItem + item.name.length > 15) {
        newTags.splice(index, 0, emptyTag);
      }
      lengthLastItem = item.name.length;
    });

    return (
      <FlatList
        data={newTags}
        numColumns={2}
        style={{ marginTop: 4 }}
        contentContainerStyle={{ alignItems: isLeft ? "flex-start" : "flex-end" }}
        renderItem={({ item }) => {
          if (item.name !== "") {
            return (
              <View
                style={[
                  styles.tagsList,
                  isLeft ? { marginEnd: 10, alignItems: "flex-start" } : { marginStart: 10, alignItems: "flex-end" },
                ]}
              >
                <Text style={styles.titleTag} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            );
          }
          return <View />;
        }}
      />
    );
  };

  const renderPlatformsTags = (tags: IDataItem[]) => {
    const emptyTag = { id: "", name: "", slug: "" };
    let newTags = [...tags];
    let lengthLastItem = 0;
    newTags.map((item, index) => {
      if (item.slug.length > 12) {
        newTags.splice(index + 1, 0, emptyTag);
      } else if (lengthLastItem + item.slug.length > 15) {
        newTags.splice(index, 0, emptyTag);
      }
      lengthLastItem = item.slug.length;
    });

    return (
      <FlatList
        data={newTags}
        style={{ marginTop: 4 }}
        horizontal
        contentContainerStyle={{ alignItems: "flex-start" }}
        renderItem={({ item }) => {
          if (item.slug !== "") {
            return (
              <View style={[styles.tagsList, { alignItems: "flex-start", marginEnd: 10 }]}>
                <Text style={styles.titleTag} numberOfLines={1}>
                  {item.slug}
                </Text>
              </View>
            );
          }
          return <View />;
        }}
      />
    );
  };

  const renderDescription = () => {
    return (
      <View>
        <Text style={styles.overView}>Overview</Text>
        <Text style={styles.description}>{game.summary}</Text>
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <>
        <Text style={styles.title}>{game.name}</Text>
        <Text style={styles.developTitle}>Developed by</Text>
        <Text style={styles.developDetail}>{getDevelopersName()}</Text>
      </>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 22 }}>
          <Header
            title={"Game Detail"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            gameStatus={gameFeel?.gameStatus}
            heart={false}
            onGamePress={() => navigation.navigate(routeNames.GameStatus, { game, gameFeel, setGameFeel })}
          />
        </Animated.View>
      </>
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <View style={{ paddingHorizontal: 22, marginBottom: 20 }}>
          {!isLoading && (
            <>
              {renderCover()}
              {renderTitle()}
              {renderInfoContainer()}
              {renderDescription()}
              {renderGenres()}
              {renderPlatforms()}
              <GameDetailTab styleComponent={{ marginTop: 40 }} game={game} />
            </>
          )}
        </View>
      </ScrollView>
      <EditButton styleComponent={styles.editButton} onPress={() => setShowModal(true)} />
      {renderGameModal()}
    </View>
  );
};

export default GameDetail;
