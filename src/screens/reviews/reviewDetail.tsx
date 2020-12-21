import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, FlatList, Animated } from "react-native";
import moment from "moment";
import useNavigation, { routeNames } from "src/hooks/use-navigation";
import LinearGradient from "react-native-linear-gradient";

import colors, { gradients } from "src/assets/colors";
import { dimensions, fontStyle } from "src/assets";
import Header from "src/components/headers";
import IGame, { IDataItem } from "src/types/api";
import DeviceUtils from "src/utils/device";
import { getImageUrl } from "src/utils/image";
import Stars from "src/components/stars";
import { getGameById } from "src/services/games";
import HeartImg from "src/assets/icons/heart";
import PencilImage from "src/assets/icons/pencil";

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
    opacity: 0.7,
    borderBottomRightRadius: dimensions.radiusBig,
    borderBottomLeftRadius: dimensions.radiusBig,
  },
  cover: {
    borderRadius: 10,
    height: 170,
    width: 130,
  },
  useravatar: {
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  userTitle: {
    ...fontStyle.titleMed,
    color: colors.white,
    marginStart: 12,
  },
  title: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateGame: {
    marginStart: 12,
    ...fontStyle.titleMed,
    color: colors.grey60,
  },
  summary: {
    marginTop: 20,
    ...fontStyle.titleMed,
    color: colors.grey30,
    lineHeight: 20,
    paddingHorizontal: 22,
  },
  circle: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: dimensions.radiusCircle,
    width: 32,
    height: 32,
    position: "absolute",
  },
  circleContainer: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radiusCircle,
  },
  feedContainer: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 12,
    width: 84,
    height: 32,
  },
  shadowFeed: {
    backgroundColor: colors.disabled,
    opacity: 0.15,
    borderRadius: 15,
    width: 84,
    height: 32,
    position: "absolute",
  },
  feedBackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    paddingHorizontal: 22,
    marginStart: -3,
  },
});

const ReviewDetail: React.FC<any> = ({ route }) => {
  const [game, setGame] = useState<IGame>((route.params && route.params.game) || {});
  const [heightView, setHeightView] = useState<number>(DeviceUtils.deviceSize.height * 0.6);
  //const [scrollY, setScrollY] = useState<any>(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState<boolean>(route.params.isEmpty || false);
  const navigation = useNavigation();

  const scrollY = new Animated.Value(0);

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [20, 0],
    extrapolate: "clamp",
  });

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [heightView, 80],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (isLoading) {
      getGameService();
    }
  }, []);

  const getGameService = async () => {
    const { data } = await getGameById(game.id);
    setGame(data[0]);
    setIsLoading(false);
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
    return <Image source={{ uri }} style={styles.cover} resizeMode={"contain"} />;
  };

  const renderInfo = () => {
    const uri = getImageUrl(game.cover && game.cover.image_id, "t_cover_big");
    return (
      <View style={{ maxWidth: "52%" }}>
        <View style={styles.flexRow}>
          <Image source={{ uri }} style={styles.useravatar} resizeMode={"cover"} />
          <Text style={styles.userTitle}>Martin Rico</Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.title}>
            {game.name} <Text style={styles.dateGame}>2017</Text>
          </Text>
        </View>
        <View style={{ justifyContent: "flex-start", marginTop: 16 }}>
          <Stars rating={90} width={15} height={13} />
        </View>
        <Text style={{ ...fontStyle.titleMed, color: colors.grey65, marginTop: 12 }}>Finished september 2018</Text>
        <Text style={{ ...fontStyle.titleMed, color: colors.grey65, marginTop: 12 }}>
          Time beated with <Text style={{ color: colors.white, fontSize: 15 }}> 40h</Text>
        </Text>
      </View>
    );
  };

  const renderSummary = () => {
    return (
      <LinearGradient colors={["rgba(0, 0, 0, 0.0)", "#171F25"]} style={{ borderRadius: 15, paddingBottom: 20 }}>
        <Text style={styles.summary}>{game.summary}</Text>
        {renderFeedBackBar()}
      </LinearGradient>
    );
  };

  const renderFeedBackBar = () => {
    return (
      <View style={styles.feedBackContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.circleContainer}>
            <View style={styles.circle} />
            <HeartImg width={17} height={13} />
          </TouchableOpacity>
          <View style={styles.feedContainer}>
            <View style={styles.shadowFeed} />
            <Text style={{ ...fontStyle.titleMed, color: colors.white }}>524 Likes</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.circleContainer}>
            <View style={styles.circle} />
            <PencilImage width={17} height={13} />
          </TouchableOpacity>
          <View style={[styles.feedContainer, { width: 110 }]}>
            <View style={[styles.shadowFeed, { width: 110 }]} />
            <Text style={{ ...fontStyle.titleMed, color: colors.white }}>524 Commts</Text>
          </View>
        </View>
      </View>
    );
  };

  const calculateRating = (rating: number) => {
    return ((rating / 100) * 5).toFixed(2);
  };

  const renderHeader = () => {
    return (
      <>
        {renderBackground()}
        <Animated.View style={{ marginTop: marginTop, paddingHorizontal: 14 }}>
          <Header
            title={"Martin's Review"}
            onBackPress={() => navigation.goBack()}
            styleComponent={{ height: 80 }}
            playIcon={false}
            heart={false}
          />
        </Animated.View>
      </>
    );
  };

  return (
    <View style={styles.component}>
      {renderHeader()}
      <ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <View
          style={{ marginBottom: 20, paddingTop: 10 }}
          onLayout={event => {
            var { height } = event.nativeEvent.layout;
            if (height !== heightView) {
              setHeightView(height + 100);
            }
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, paddingHorizontal: 22 }}>
            {renderInfo()}
            {renderCover()}
          </View>
          {renderSummary()}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewDetail;
