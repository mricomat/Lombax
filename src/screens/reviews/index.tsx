import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity, Animated } from "react-native";

import { colors, dimensions, fontStyle } from "src/assets";
import Stars from "src/components/stars";
import IGame from "src/types/api";
import { getMainGame, getTopRated } from "src/services/games";
import { getImageUrl } from "src/utils/image";
import DeviceUtils from "src/utils/device";
import useNavigation, { routeNames } from "src/hooks/use-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey80,
  },
  title: {
    ...fontStyle.bigTitle,
    color: colors.white,
    alignSelf: "center",
  },
  reviewContainer: {
    borderRadius: 15,
    width: "100%",
    height: 180,
    marginBottom: 12,
    elevation: 4,
  },
  titleReview: {
    ...fontStyle.titleBold,
    color: colors.white,
  },
  userTitle: {
    ...fontStyle.menuLabel,
    color: colors.white,
    marginStart: 12,
  },
  gameDate: {
    ...fontStyle.menuLabel,
    color: colors.grey10,
    marginStart: 15,
  },
  reviewDate: {
    ...fontStyle.titleMed,
    color: colors.grey10,
  },
  userAvatar: {
    borderRadius: dimensions.radiusCircle,
    width: 30,
    height: 30,
    borderWidth: 0.5,
    borderColor: colors.grey30,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapContainer: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  summary: {
    ...fontStyle.menuLabel,
    color: colors.grey65,
    lineHeight: 17,
    fontSize: 13,
    marginBottom: 4,
  },
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 20,
  },
});

const ReviewsScreen = ({}) => {
  const [topGames, setTopGames] = useState<IGame[]>([]);
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;

  const heightBack = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [DeviceUtils.deviceSize.height * 0.6, 80],
    extrapolate: "clamp",
  });

  const scaleTitle = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.48],
    extrapolate: "clamp",
  });

  const marginTop = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [40, 20],
    extrapolate: "clamp",
  });

  useEffect(() => {
    mainGameService();
  }, []);

  const mainGameService = async () => {
    const mainGamesResult = await getMainGame();
    setTopGames(mainGamesResult.data);
  };

  const renderReview = ({ item }) => {
    const uri = getImageUrl(item.cover && item.cover.image_id, "t_cover_big");

    return (
      <TouchableOpacity
        style={styles.reviewContainer}
        onPress={() => navigation.navigate(routeNames.ReviewDetail, { game: item })}
      >
        <View style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Image
            source={{ uri }}
            resizeMode={"cover"}
            style={{ width: "100%", height: "100%", position: "absolute", borderRadius: 15 }}
          />
          <View
            style={{
              backgroundColor: colors.grey50,
              width: "100%",
              height: "100%",
              opacity: 0.7,
              borderRadius: 15,
            }}
          />
        </View>
        <View style={styles.wrapContainer}>
          <View style={{ justifyContent: "space-between", height: "100%" }}>
            <View style={styles.flexRow}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleReview}>Hollow knight</Text>
                <Text style={styles.gameDate}>2017</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("src/assets/images/backhollow.png")}
                  resizeMode={"cover"}
                  style={styles.userAvatar}
                />
                <Text style={styles.userTitle}>Martin Rico</Text>
              </View>
            </View>
            <View style={[styles.flexRow, { marginBottom: 5 }]}>
              <Text style={styles.reviewDate}>February 24</Text>
              <Stars rating={70} />
            </View>
            <Text style={styles.summary} numberOfLines={4}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBackground = () => {
    return (
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Animated.Image
          source={require("src/assets/images/backhollow.png")}
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: heightBack,
            position: "absolute",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        />
        <Animated.View
          style={{
            backgroundColor: colors.grey50,
            width: "100%",
            height: heightBack,
            opacity: 0.65,
            borderBottomEndRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackground()}
      <Animated.View style={{ marginTop, paddingBottom: 20 }}>
        <Animated.Text style={[styles.title, { transform: [{ scale: scaleTitle }] }]}>Reviews</Animated.Text>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <Animated.FlatList
          data={topGames}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
          renderItem={renderReview}
          style={{ flex: 1 }}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </View>
  );
};

export default ReviewsScreen;
